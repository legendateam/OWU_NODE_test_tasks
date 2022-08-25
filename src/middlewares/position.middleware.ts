import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { PositionToAdd, PositionToPatch } from '../types';
import { positionToAddSchema, positionToPatchSchema } from '../utils';
import { CustomError } from '../errors';
import { HttpStatusEnum } from '../enums';

class PositionMiddleware {
    public positionCreateValidate(req: IRequestExtended, res: Response, next: NextFunction): void {
        const position = req.body as PositionToAdd;
        const { error, value } = positionToAddSchema.validate(position);

        if (error) {
            next(new CustomError(error.message, HttpStatusEnum.BAD_REQUEST));
            return;
        }

        req.position = value;
        next();
    }

    public positionUpdateValidate(req: IRequestExtended, res: Response, next: NextFunction): void {
        const position = req.body as PositionToPatch;
        const { error, value } = positionToPatchSchema.validate(position);

        if (error) {
            next(new CustomError(error.message, HttpStatusEnum.BAD_REQUEST));
            return;
        }

        req.position = value;
        next();
    }
}

export const positionMiddleware = new PositionMiddleware();
