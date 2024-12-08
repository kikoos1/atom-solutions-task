import {Request, Response} from "express";
import {callHandler} from "../../utils";
import getRTP from "../game/getRTP";
import depositFunds from "./depositFunds";
import withdrawFunds from "./withdrawFunds";
import getBalance from "./getBalance";

export const depositFundsHandler = (req: Request, res: Response) => callHandler(req, res, depositFunds);
export const withdrawFundsHandler = (req: Request, res: Response) => callHandler(req, res, withdrawFunds);
export const getBalanceHandler = (req: Request, res: Response) => callHandler(req, res, getBalance);