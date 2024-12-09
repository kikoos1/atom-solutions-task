import { Response } from 'express';
import { StatusTypes } from './enums';

export class ValidationError extends Error {
    errorCode: number;

    constructor(message: string) {
        super(message);
        this.errorCode = 400;
    }
}

export function handleError(e: unknown, res: Response) {
    if (e instanceof ValidationError) {
        res.status(e.errorCode).json({
            error: e.message,
            status: StatusTypes.error
        });
    } else if (e instanceof Error) {
        res.status(500).json({
            error: e.message,
            status: StatusTypes.error
        });
    }
}