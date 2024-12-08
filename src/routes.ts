import express, { Request, Response } from 'express';
import GameController from './controllers/game/GameController';
import WalletController from './controllers/wallet/WalletController';

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