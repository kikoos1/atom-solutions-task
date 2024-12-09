import Wallet from './Wallet';
import { ValidationError } from '../utils/errors';
import { ErrorTypes } from '../utils/enums';

interface BaseWalletParams{
    amount:number
}

interface GetBalanceResponse {
    balance: number
}

export default class WalletService {
    static depositFunds(params: BaseWalletParams) {
        if (!params.amount) {
            throw new ValidationError('Validation Error: "amount" is required!');
        }

        Wallet.add(params.amount);
    }

    static withdrawFunds(params: BaseWalletParams) {
        if (!params.amount) {
            throw new ValidationError('Validation Error: "amount" is required!');
        }

        const currentBalance = Wallet.getBalance();

        if (currentBalance < params.amount) {
            throw new Error(ErrorTypes.insufficientFunds);
        }

        Wallet.deduct(params.amount);
    }

    static getBalance():GetBalanceResponse{
        const balance = Wallet.getBalance();

        return {
            balance: balance
        }
    }
}