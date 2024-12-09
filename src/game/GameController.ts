import { Request, Response } from 'express';
import GameService from './GameService';
import { handleError } from '../utils/errors';


export default class GameController {
    static play(req: Request, res: Response): void {
        try {
            const playResponse = GameService.play(req.body);
            res.send(playResponse);
        } catch (e) {
            handleError(e, res);
        }
    }

    static sim(req: Request, res: Response): void {
        try {
            const simResponse = GameService.sim(req.body);
            res.send(simResponse);
        } catch (e) {
            handleError(e, res);
        }

    }

    static getRTP(req: Request, res: Response): void {
        const rtpResponse = GameService.getRtp();
        res.json(rtpResponse);
    }
}