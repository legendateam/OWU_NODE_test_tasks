import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import {
    PositionParamsId, PositionToAdd, PositionToPatch, QueryParams,
} from '../types';
import {
    paramsIdSchema, positionSearchParams, positionToAddSchema, positionToPatchSchema,
} from '../utils';
import { CustomError } from '../errors';
import { HttpStatusEnum } from '../enums';
import { errorsMessagesConstant } from '../constants';
import { positionRepository } from '../repositories';

class PositionMiddleware {
    public createValidate(req: IRequestExtended, _: Response, next: NextFunction): void {
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
            const { error } = paramsIdSchema.validate({ _id: position_id });

            if (error) {
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
            const position_id = req._id as PositionParamsId;

            const position = await positionRepository.getOneById(position_id);

            if (!position) {
                next(new CustomError(errorsMessagesConstant.notFoundPositions, HttpStatusEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public isQueryParams(req: IRequestExtended, _: Response, next: NextFunction):void {
        try {
            const { tag, level, category } = req.query as QueryParams;

            const { error, value } = positionSearchParams.validate({ tag, level, category });

            if (error) {
                next(new CustomError(errorsMessagesConstant.badRequest, HttpStatusEnum.BAD_REQUEST));
                return;
            }

            if (value) {
                const { tag, level, category } = value;

                if (tag && !level && !category) req.searchParams = { tag };
                if (level && !tag && !category) req.searchParams = { level };
                if (category && !tag && !level) req.searchParams = { category };

                if (tag && level && !category) req.searchParams = { tag, level };
                if (tag && category && !level) req.searchParams = { tag, category };
                if (!tag && category && level) req.searchParams = { category, level };
                if (tag && level && category) req.searchParams = { tag, level, category };
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const positionMiddleware = new PositionMiddleware();
