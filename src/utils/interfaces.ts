import {StatusTypes} from "./enums";
import {Response} from "express";

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

export interface GetRTPResponse extends Response{
    rtp: number
}


export interface BaseWalletParams{
    amount:number
}

export interface GetBalanceResponse {
    balance: number
}

export interface BaseResponse {
    status: StatusTypes
}

export interface BaseErrorResponse extends BaseResponse {
    error: string
}