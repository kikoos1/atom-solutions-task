import express, { Request, Response } from 'express';
import GameController from './game/GameController';
import WalletController from './wallet/WalletController';

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router.post('/play', GameController.play);

router.post('/sim', GameController.sim);
//
router.get('/rtp', GameController.getRTP);

router.post('/wallet/deposit', WalletController.depositFunds);

router.post('/wallet/withdraw', WalletController.withdrawFunds);

router.get('/wallet/balance', WalletController.getBalance);

export default router;