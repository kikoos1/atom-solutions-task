import {GetRTPResponse, PlayParams, PlayResponse, SimParams, SimResponse} from "../../utils/interfaces";
import {playParamsSchema} from "../../validators/playParamsSchema";
import GameService from "../../services/gameService";
import Wallet from "../../state/wallet";
import {simParamsSchema} from "../../validators/simParamsSchema";
import Statistics from "../../state/statistics";

export default (): GetRTPResponse => {

    const stats = Statistics.getInstance();

    return {
        rtp: stats.getRTP()
    };
}