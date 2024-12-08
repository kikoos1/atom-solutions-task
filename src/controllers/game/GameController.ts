import {Request, Response} from "express";
import GameService from "../../services/gameService";
import Wallet from "../../models/Wallet";
import {ErrorTypes, StatusTypes} from "../../utils/enums";
import {
    BaseErrorResponse,
    GetRTPResponse,
    PlayParams,
    PlayResponse,
    SimParams,
    SimResponse
} from "../../utils/interfaces";
import Statistics from "../../models/Statistics";

export default class GameController {
    static play(req: Request, res: Response): void {
        const params: PlayParams = req.body;

        if (!params.bet) {
            res.status(400).json(<BaseErrorResponse>{
                error: 'Validation Error: "bet" is required!',
                status: StatusTypes.error
            })
            return
        }

        const gameService = new GameService();

        if (Wallet.getBalance() < params.bet) {
            res.status(500).json(<BaseErrorResponse>{
                error: ErrorTypes.insufficientFunds
            })
            return
        }

        Wallet.deduct(params.bet);

        const {matrix, winnings} = gameService.spin(params.bet);

        Wallet.add(winnings);
        res.json(<PlayResponse>{
            matrix,
            winnings
        });
    }

    static sim(req: Request, res: Response): void {
        const params: SimParams = req.body;

        if (!params.bet) {
            res.status(400).json(<BaseErrorResponse>{
                error: 'Validation Error: "bet" is required!',
                status: StatusTypes.error
            })
            return
        }

        if (!params.count) {
            res.status(400).json(<BaseErrorResponse>{
                error: 'Validation Error: "count" is required!',
                status: StatusTypes.error
            })
            return
        }


        const gameService = new GameService();

        const totalBet = params.bet * params.count;

        if (Wallet.getBalance() < totalBet) {
            res.status(500).json(<BaseErrorResponse>{
                error: ErrorTypes.insufficientFunds,
                status: StatusTypes.error
            })
            return
        }

        Wallet.deduct(totalBet);
        let totalWinnings = 0;

        for (let i = 0; i < params.count; i++) {
            const {winnings} = gameService.spin(params.bet);
            totalWinnings += winnings;
        }

        const netResult = totalWinnings - totalBet;
        Wallet.add(totalWinnings);

        res.json(<SimResponse>{
            totalWinnings: totalWinnings,
            netResult: netResult
        })
    }

    static getRTP(req: Request, res: Response): void {
        res.status(200).json(<GetRTPResponse>{
            rtp: Statistics.getRTP()
        });
    }
}