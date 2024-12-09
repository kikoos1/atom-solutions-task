import { Request, Response } from 'express';
import { handleError, StatusTypes } from '../errors';
import WalletService from './WalletService';

class WalletController {
     depositFunds(req: Request, res: Response): void {
        try {
            WalletService.depositFunds(req.body);
            res.send({
                status: StatusTypes.success,
            });
        } catch (e) {
            handleError(e, res);
        }
    }

     withdrawFunds(req: Request, res: Response): void {
        try {
            WalletService.withdrawFunds(req.body);
            res.send({
                status: StatusTypes.success,
            });
        } catch (e) {
            handleError(e, res);
        }

    }

     getBalance(req: Request, res: Response): void {
        const balanceResponse = WalletService.getBalance();
        res.json(balanceResponse);
    }
}

export default new WalletController();