import { Router } from 'express';

import { positionsController } from '../controllers';
import { positionMiddleware } from '../middlewares';

export const positionsRouter = Router();

positionsRouter.get(
    '/',
    positionMiddleware.isQueryParams,
    positionsController.getAll,
);
positionsRouter.get(
    '/:position_id',
    positionMiddleware.checkParamsOnId,
    positionsController.getOne,
);
positionsRouter.post(
    '/',
    positionMiddleware.createValidate,
    positionsController.createOne,
);
positionsRouter.patch(
    '/:position_id',
    positionMiddleware.checkParamsOnId,
    positionMiddleware.positionUpdateValidate,
    positionMiddleware.checkPositionExists,
    positionsController.updateOnePartial,
);
positionsRouter.delete(
    '/:position_id',
    positionMiddleware.checkParamsOnId,
    positionMiddleware.checkPositionExists,
    positionsController.deleteOne,
);
