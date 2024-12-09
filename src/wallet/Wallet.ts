class Wallet {
    protected balance: number

    constructor() {
        this.balance = 100;
    }

    add(amount: number) {
        this.balance += amount;
    }

    deduct(amount: number) {
        this.balance -= amount;
    }

    getBalance() {
        return this.balance;
    }
}

export default new Wallet();
