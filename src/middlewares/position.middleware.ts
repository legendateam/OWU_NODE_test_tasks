import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { PositionParamsId, PositionToAdd, PositionToPatch } from '../types';
import { positionToAddSchema, positionToPatchSchema } from '../utils';
import { CustomError } from '../errors';
import { HttpStatusEnum } from '../enums';
import { errorsMessagesConstant } from '../constants';
import { positionRepository } from '../repositories/position.repository';

class PositionMiddleware {
    public positionCreateValidate(req: IRequestExtended, _: Response, next: NextFunction): void {
        const position = req.body as PositionToAdd;
        const { error, value } = positionToAddSchema.validate(position);

        if (error) {
            next(new CustomError(error.message, HttpStatusEnum.BAD_REQUEST));
            return;
        }

        req.positionToAdd = value;
        next();
    }

    public positionUpdateValidate(req: IRequestExtended, _: Response, next: NextFunction): void {
        const position = req.body as PositionToPatch;
        const { error, value } = positionToPatchSchema.validate(position);

        if (error) {
            next(new CustomError(error.message, HttpStatusEnum.BAD_REQUEST));
            return;
        }

        req.positionToPatch = value;
        next();
    }

    public checkParamsOnId(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { position_id } = req.params as PositionParamsId;

            if (!position_id) {
                next(new CustomError(errorsMessagesConstant.missingParams, HttpStatusEnum.BAD_REQUEST));
                return;
            }

            req._id = { position_id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkPositionExists(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { position_id } = req._id!;

            const position = await positionRepository.getOne({ position_id });

            if (!position) {
                next(new CustomError(errorsMessagesConstant.notFoundPositions, HttpStatusEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const positionMiddleware = new PositionMiddleware();
