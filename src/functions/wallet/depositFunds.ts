import Wallet from "../../state/wallet";
import {BaseResponse, DepositFundsParams} from "../../utils/interfaces";
import {depositFundsParamsSchema} from "../../validators/depositFundsParamsSchema";
import {StatusTypes} from "../../utils/enums";

export default async (params: DepositFundsParams): Promise<BaseResponse> => {
    await depositFundsParamsSchema.validateAsync(params);

    const wallet = Wallet.getInstance();
    wallet.add(params.amount);

    return {
        status: StatusTypes.success
    }
}