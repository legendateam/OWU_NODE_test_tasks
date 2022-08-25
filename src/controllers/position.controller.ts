import { NextFunction, Request, Response } from 'express';

import { positionRepository } from '../repositories/position.repository';
import { HttpStatusEnum } from '../enums';
import { CustomError } from '../errors';
import { errorsMessagesConstant } from '../constants';
import { PositionParamsId, PositionToAdd } from '../types';
import { IRequestExtended } from '../interfaces';

class PositionController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const positions = await positionRepository.getAll();

            if (!positions) {
                next(new CustomError(errorsMessagesConstant.notFoundPositions, HttpStatusEnum.NOT_FOUND));
                return;
            }

            res.status(HttpStatusEnum.OK).json(positions);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { position_id } = req.params as PositionParamsId;

            const position = await positionRepository.getOne({ position_id });

            if (!position) {
                next(new CustomError(errorsMessagesConstant.notFoundPosition, HttpStatusEnum.NOT_FOUND));
                return;
            }

            res.status(HttpStatusEnum.OK).json([position]);
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const position = req.position as PositionToAdd;
            const positionCreated = await positionRepository.createOne({ position });

            if (!positionCreated) {
                next(new CustomError(errorsMessagesConstant.notImplementedPosition, HttpStatusEnum.NOT_IMPLEMENTED));
                return;
            }

            const id = positionCreated._id;
            res.status(HttpStatusEnum.CREATED).location(`${id}`).end();
        } catch (e) {
            next(e);
        }
    }

    public updateOnePartial() {

    }

    public deleteOne() {

    }
}

export const positionsController = new PositionController();
