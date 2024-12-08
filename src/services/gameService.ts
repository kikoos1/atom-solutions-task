import {generateRandomNumber} from "../utils";
import {PlayResponse} from "../utils/interfaces";
import Wallet from "../state/wallet";
import Statistics from "../state/statistics";

export default class GameService {
    protected stats: Statistics;

    constructor() {
        this.stats = Statistics.getInstance();
    }


    spin(bet: number): PlayResponse {
        const matrix = this.generateGrid();
        let winnings = 0;

        for (const row of matrix) {
            const matching = new Set(row);

            if (matching.size === 1) {
                winnings += bet * 5
            }
        }

        this.stats.increaseBets(bet);
        this.stats.increaseWinnings(winnings);


        return {
            matrix: matrix,
            winnings: winnings
        };
    }

    private generateGrid(): string[][] {
        const initialGrid = [
            [1, 2, 3, 4, 5],
            [1, 3, 2, 5, 4],
            [5, 4, 3, 1, 2],
        ]

        const generatedGrid = [];

        for (const row of initialGrid) {
            const newRow = [];
            for (let i = 0; i < 3; i++) {
                const index = generateRandomNumber(0, row.length);
                newRow.push(row[index].toString())
            }
            generatedGrid.push(newRow);
        }

        return generatedGrid;
    }
}