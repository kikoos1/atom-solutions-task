import Statistics from './Game';
import { ErrorTypes } from '../utils/enums';
import Wallet from '../wallet/Wallet';
import { ValidationError } from '../utils/errors';
import Game from './Game';

interface PlayParams {
    bet: number
}

interface SimParams {
    count: number
    bet: number
}

interface SimResponse {
    totalWinnings: number
    netResult: number
}


interface PlayResponse {
    matrix: string[][];
    winnings: number
}

interface GetRTPResponse{
    rtp: number
}

export default class GameService {
    static play(params: PlayParams): PlayResponse {
        if (!params.bet) {
            throw new ValidationError('Validation Error: "bet" is required!');
        }

        if (Wallet.getBalance() < params.bet) {
            throw new Error(ErrorTypes.insufficientFunds);
        }

        Wallet.deduct(params.bet);

        const { matrix, winnings } = this.spin(params.bet);

        Wallet.add(winnings);

        return {
            matrix,
            winnings,
        };
    }

    static sim(params: SimParams): SimResponse {
        if (!params.bet) {
            throw new ValidationError('Validation Error: "bet" is required!');
        }

        if (!params.count) {
            throw new ValidationError('Validation Error: "count" is required!');
        }


        const totalBet = params.bet * params.count;

        if (Wallet.getBalance() < totalBet) {
            throw new Error(ErrorTypes.insufficientFunds);
        }

        Wallet.deduct(totalBet);
        let totalWinnings = 0;

        for (let i = 0; i < params.count; i++) {
            const { winnings } = this.spin(params.bet);
            totalWinnings += winnings;
        }

        const netResult = totalWinnings - totalBet;
        Wallet.add(totalWinnings);

        return {
            totalWinnings: totalWinnings,
            netResult: netResult,
        };
    }

    static getRtp(): GetRTPResponse {
        const rtp = Game.getRTP();

        return {
            rtp: rtp,
        };
    }


    private static spin(bet: number): PlayResponse {
        const matrix = this.generateGrid();
        let winnings = 0;

        for (const row of matrix) {
            const matching = new Set(row);

            if (matching.size === 1) {
                winnings += bet * 5;
            }
        }

        Statistics.increaseBets(bet);
        Statistics.increaseWinnings(winnings);


        return {
            matrix: matrix,
            winnings: winnings,
        };
    }

    private static generateGrid(): string[][] {
        const initialGrid = [
            [1, 2, 3, 4, 5],
            [1, 3, 2, 5, 4],
            [5, 4, 3, 1, 2],
        ];

        const generatedGrid = [];

        for (const row of initialGrid) {
            const newRow = [];
            for (let i = 0; i < 3; i++) {
                const index = this.generateRandomNumber(0, row.length);
                newRow.push(row[index].toString());
            }
            generatedGrid.push(newRow);
        }

        return generatedGrid;
    }

    private static generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}