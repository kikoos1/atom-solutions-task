import play from "./play";
import {Request, Response} from "express";
import {callHandler} from "../../utils";
import sim from "./sim";
import getRTP from "./getRTP";

export const playHandler = (req: Request, res: Response) => callHandler(req, res, play);
export const simHandler = (req: Request, res: Response) => callHandler(req, res, sim);
export const getRTPHandler = (req: Request, res: Response) => callHandler(req, res, getRTP);