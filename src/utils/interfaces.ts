import {StatusTypes} from "./enums";

export interface PlayParams {
    bet: number
}

export interface SimParams {
    count: number
    bet: number
}

export interface SimResponse {
    totalWinnings: number
    netResult: number
}


export interface PlayResponse {
    matrix: string[][];
    winnings: number
}

export interface GetRTPResponse {
    rtp: number
}

export interface DepositFundsParams {
    amount: number
}

export interface WithdrawFundsParams {
    amount: number
}

export interface GetBalanceResponse {
    balance: number
}

export interface BaseResponse {
    status: StatusTypes
}