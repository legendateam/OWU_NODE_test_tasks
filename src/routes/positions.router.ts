import { Router } from 'express';

import { positionsController } from '../controllers';

export const positionsRouter = Router();

positionsRouter.get('/', positionsController.getAll);
positionsRouter.get('/:position_id', positionsController.getOne);
positionsRouter.post('/', positionsController.createOne);
positionsRouter.patch('/:position_id', positionsController.updateOnePartial);
positionsRouter.delete('/:position_id', positionsController.deleteOne);
