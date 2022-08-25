import { Router } from 'express';

import { positionsController } from '../controllers';
import { positionMiddleware } from '../middlewares';

export const positionsRouter = Router();

positionsRouter.get('/', positionsController.getAll);
positionsRouter.get('/:position_id', positionsController.getOne);
positionsRouter.post('/', positionMiddleware.positionCreateValidate, positionsController.createOne);
positionsRouter.patch('/:position_id', positionMiddleware.positionUpdateValidate, positionsController.updateOnePartial);
positionsRouter.delete('/:position_id', positionsController.deleteOne);
