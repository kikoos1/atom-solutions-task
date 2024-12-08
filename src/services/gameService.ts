import {PlayResponse} from "../utils/interfaces";
import Statistics from "../models/Statistics";

export default class GameService {
    spin(bet: number): PlayResponse {
        const matrix = this.generateGrid();
        let winnings = 0;

        for (const row of matrix) {
            const matching = new Set(row);

            if (matching.size === 1) {
                winnings += bet * 5
            }
        }

        Statistics.increaseBets(bet);
        Statistics.increaseWinnings(winnings);


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
                const index = this.generateRandomNumber(0, row.length);
                newRow.push(row[index].toString())
            }
            generatedGrid.push(newRow);
        }

        return generatedGrid;
    }

    private generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}