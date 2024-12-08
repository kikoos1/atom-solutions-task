import {Request, Response} from "express";
import {
    BaseErrorResponse,
    BaseResponse, BaseWalletParams,
    GetBalanceResponse,
} from "../../utils/interfaces";
import {StatusTypes} from "../../utils/enums";
import Wallet from "../../models/Wallet";

export default class WalletController {
    static depositFunds(req: Request, res: Response): void {
        const params: BaseWalletParams = req.body;

        if (!params.amount) {
            res.status(400).json(<BaseErrorResponse>{
                error: 'Validation Error: "amount" is required!',
                status: StatusTypes.error
            })

            return
        }

        Wallet.add(params.amount);

        res.json(<BaseResponse>{
            status: StatusTypes.success
        });
    }

    static getBalance(req: Request, res: Response): void {
        res.json(<GetBalanceResponse>{
            balance: Wallet.getBalance()
        });
    }

    static withdrawFunds(req: Request, res: Response): void {
        const params: BaseWalletParams = req.body;

        if (!params.amount) {
            res.status(400).json(<BaseResponse>{
                error: 'Validation Error: "amount" is required!',
                status: StatusTypes.error
            });
        }

        const currentBalance = Wallet.getBalance();

        if (currentBalance < params.amount) {
            res.status(500).json(<BaseResponse>{
                error: 'Error: Insufficient funds!',
                status: StatusTypes.error
            });
        }

        Wallet.deduct(params.amount);

        res.json(<BaseResponse>{
            status: StatusTypes.success
        });
    }
}