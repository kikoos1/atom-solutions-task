class Game {
    protected bets: number
    protected totalWinnings: number
    
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

export default new Game();