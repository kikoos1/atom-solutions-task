export default class Wallet {
    protected balance: number
    private static _instance: Wallet;

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Wallet();
        return this._instance;
    }

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
