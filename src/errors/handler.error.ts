import { NextFunction, Request, Response } from 'express';

import { CustomError } from './custom.error';
import { HttpStatusEnum } from '../enums';

class HandlerError {
    public apiRouter(err: CustomError, req: Request, res: Response, next: NextFunction): void {
        res.status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
            error: err.message,
            status: err?.status || HttpStatusEnum.INTERNAL_SERVER_ERROR,
        });
    }
}

export const handleError = new HandlerError();
