import { Router } from 'express';

import { applicantController } from '../controllers';

export const applicantsRouter = Router();

applicantsRouter.post('/', applicantController.createOne);
applicantsRouter.put('/:applicant_id', applicantController.updateOneFull);
applicantsRouter.delete('/:applicant_id', applicantController.deleteOne);
