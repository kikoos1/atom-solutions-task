import Wallet from "../../state/wallet";
import {BaseResponse, DepositFundsParams, GetBalanceResponse} from "../../utils/interfaces";
import {depositFundsParamsSchema} from "../../validators/depositFundsParamsSchema";
import {StatusTypes} from "../../utils/enums";
import {withdrawFundsParamsSchema} from "../../validators/withdrawFundsParamsSchema";

export default (): GetBalanceResponse => {

    const wallet = Wallet.getInstance();

    return {
        balance: wallet.getBalance()
    }
}