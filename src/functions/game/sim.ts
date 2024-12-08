import {PlayParams, PlayResponse, SimParams, SimResponse} from "../../utils/interfaces";
import {playParamsSchema} from "../../validators/playParamsSchema";
import GameService from "../../services/gameService";
import Wallet from "../../state/wallet";
import {simParamsSchema} from "../../validators/simParamsSchema";
import {ErrorTypes} from "../../utils/enums";
import {throwError} from "../../utils";

export default async (params: SimParams): Promise<SimResponse> => {

    try {
        await simParamsSchema.validateAsync(params);
    } catch (e) {
        throwError(e, 'Validation Error')
    }


    const gameService = new GameService();

    const wallet = Wallet.getInstance();

    const totalBet = params.bet * params.count;

    if (wallet.getBalance() < totalBet) {
        throw new Error(ErrorTypes.insufficientFunds)
    }

    wallet.deduct(totalBet);

    let totalWinnings = 0;

    for (let i = 0; i < params.count; i++) {
        const {winnings} = gameService.spin(params.bet);

        totalWinnings += winnings;
    }

    const netResult = totalWinnings - totalBet;

    return {
        totalWinnings: totalWinnings,
        netResult: netResult
    }


}