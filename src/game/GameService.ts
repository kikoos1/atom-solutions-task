import Statistics from './Game';
import { ValidationError, ErrorTypes } from '../errors';
import Game from './Game';
import WalletService from '../wallet/WalletService';

interface PlayParams {
    bet: number;
}

interface SimParams {
    count: number;
    bet: number;
}

interface SimResponse {
    totalWinnings: number;
    netResult: number;
}


interface PlayResponse {
    matrix: string[][];
    winnings: number;
}

interface GetRTPResponse {
    rtp: number;
}

class GameService {
    play(params: PlayParams): PlayResponse {
        if (!params.bet) {
            throw new ValidationError('Validation Error: "bet" is required!');
        }

        const { balance } = WalletService.getBalance();

        if (balance < params.bet) {
            throw new Error(ErrorTypes.insufficientFunds);
        }

        WalletService.deductFunds({
            amount: params.bet,
        });

        const { matrix, winnings } = this.spin(params.bet);

        if (winnings > 0) {
            WalletService.addFunds({
                amount: winnings,
            });
        }

        return {
            matrix,
            winnings,
        };
    }

    sim(params: SimParams): SimResponse {
        if (!params.bet) {
            throw new ValidationError('Validation Error: "bet" is required!');
        }

        if (!params.count) {
            throw new ValidationError('Validation Error: "count" is required!');
        }


        const totalBet = params.bet * params.count;
        const { balance } = WalletService.getBalance();

        if (balance < totalBet) {
            throw new Error(ErrorTypes.insufficientFunds);
        }

        WalletService.deductFunds({
            amount: params.bet,
        });

        let totalWinnings = 0;

        for (let i = 0; i < params.count; i++) {
            const { winnings } = this.spin(params.bet);
            totalWinnings += winnings;
        }

        const netResult = totalWinnings - totalBet;

        if (totalWinnings > 0) {
            WalletService.addFunds({
                amount: totalWinnings,
            });
        }

        return {
            totalWinnings: totalWinnings,
            netResult: netResult,
        };
    }

    getRtp(): GetRTPResponse {
        const rtp = Game.getRTP();

        return {
            rtp: rtp,
        };
    }

    private spin(bet: number): PlayResponse {
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

    private generateGrid(): string[][] {
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

    private generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

export default new GameService();