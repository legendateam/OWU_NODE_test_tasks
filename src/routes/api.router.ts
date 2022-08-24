import { Router } from 'express';

import { handleError } from '../errors';
import { positionsRouter } from './positions.router';
import { applicantsRouter } from './applicants.router';

export const apiRouter = Router();

apiRouter.use('/positions', positionsRouter);
apiRouter.use('/applicants', applicantsRouter);
apiRouter.use('*', handleError.apiRouter);
