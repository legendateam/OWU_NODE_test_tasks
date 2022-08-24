import { Request, Response, NextFunction } from 'express';

import { positionRepository } from '../repositories/positrion.repository';
import { HttpStatusEnum } from '../enums';

class PositionController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const positions = await positionRepository.getAll();
            res.status(HttpStatusEnum.OK).json({
                positions,
            });
        } catch (e) {
            next(e);
        }
    }

    public getOne() {

    }

    public async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const position = req.body;
            const created = await positionRepository.createOne(position);
            res.status(HttpStatusEnum.CREATED).json({
                created,
            });
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
