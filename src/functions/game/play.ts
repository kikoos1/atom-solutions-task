import {PlayParams, PlayResponse} from "../../utils/interfaces";
import {playParamsSchema} from "../../validators/playParamsSchema";
import GameService from "../../services/gameService";
import Wallet from "../../state/wallet";
import {throwError} from "../../utils";
import {ErrorTypes} from "../../utils/enums";

export default async (params: PlayParams): Promise<PlayResponse> => {

    try {
        await playParamsSchema.validateAsync(params);
    } catch (e) {
        throwError(e, 'Validation Error')
    }


    const gameService = new GameService();

    const wallet = Wallet.getInstance();

    if (wallet.getBalance() < params.bet) {
        throwError(null, ErrorTypes.insufficientFunds)
    }
    wallet.deduct(params.bet);

    const {matrix, winnings} = gameService.spin(params.bet);

    wallet.add(winnings);

    return {
        matrix,
        winnings
    }
}