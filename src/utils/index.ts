import {NextFunction, Request, Response} from "express";
import Joi, {ValidationError} from "joi";
import {StatusTypes} from "./enums";

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function handleErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', {error: err})
}

export async function callHandler(req: Request, res: Response, handler: any) {
    try {
        const resp = await handler(req.body)
        res.json(resp);
    } catch (e) {
        res.status(500)
        res.json({
            error: e instanceof Error ? e.message : '',
            status: StatusTypes.error
        })
    }
}

export function throwError(e: unknown, customMessage: string = '') {
    const errorMessage = `${customMessage ? customMessage + ': ' : ''}${
        e instanceof Error ? e.message : e instanceof ValidationError ? e.details[0].message : ''
    }`.toLowerCase();

    console.log(`Error: ${errorMessage}`);

    throw new Error(errorMessage);
}




