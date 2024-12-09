import Wallet from './Wallet';
import { ValidationError, ErrorTypes } from '../errors';

interface BaseWalletParams {
    amount: number;
}

interface GetBalanceResponse {
    balance: number;
}

class WalletService {
    depositFunds(params: BaseWalletParams) {
        if (!params.amount) {
            throw new ValidationError('Validation Error: "amount" is required!');
        }

        Wallet.add(params.amount);
    }

    withdrawFunds(params: BaseWalletParams) {
        if (!params.amount) {
            throw new ValidationError('Validation Error: "amount" is required!');
        }

        const currentBalance = Wallet.getBalance();

        if (currentBalance < params.amount) {
            throw new Error(ErrorTypes.insufficientFunds);
        }

        Wallet.deduct(params.amount);
    }

    getBalance(): GetBalanceResponse {
        const balance = Wallet.getBalance();

        return {
            balance: balance,
        };
    }
}

export default new WalletService();