export default class Statistics {
    protected bets: number
    protected totalWinnings: number
    private static _instance: Statistics;

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Statistics();
        return this._instance;
    }

    constructor() {
        this.bets = 0;
        this.totalWinnings = 0;
    }

    increaseBets(amount: number) {
        this.bets += amount;
    }

    increaseWinnings(amount: number) {
        this.totalWinnings += amount;
    }

    getRTP(): number {
        return (this.totalWinnings / this.bets) * 100;
    }

}
