import Wallet from "../../state/wallet";
import {BaseResponse, DepositFundsParams, WithdrawFundsParams} from "../../utils/interfaces";
import {depositFundsParamsSchema} from "../../validators/depositFundsParamsSchema";
import {ErrorTypes, StatusTypes} from "../../utils/enums";
import {withdrawFundsParamsSchema} from "../../validators/withdrawFundsParamsSchema";
import {throwError} from "../../utils";

export default async (params: WithdrawFundsParams): Promise<BaseResponse> => {

    try{
        await withdrawFundsParamsSchema.validateAsync(params);
    }catch (e) {
        throwError(e,'Validation Error');
    }


    const wallet = Wallet.getInstance();
    const currentAmount = wallet.getBalance();

    if (currentAmount < params.amount) {
        throw new Error(ErrorTypes.insufficientFunds)
    }

    wallet.deduct(params.amount);

    return {
        status: StatusTypes.success
    }
}