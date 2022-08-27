import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { applicantRepository } from '../repositories';
import { CustomError } from '../errors';
import { errorsMessagesConstant } from '../constants';
import { HttpStatusEnum } from '../enums';
import { ApplicantParamsId } from '../types';

class ApplicantController {
    public async createOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const applicantToAdd = req.applicantToAdd!;

            const applicantCreated = await applicantRepository.addOne(applicantToAdd);

            if (!applicantCreated) {
                next(new CustomError(errorsMessagesConstant.notImplemented, HttpStatusEnum.NOT_IMPLEMENTED));
                return;
            }

            res.status(HttpStatusEnum.CREATED).location(`${applicantCreated._id}`).end();
        } catch (e) {
            next(e);
        }
    }

    public async updateOneFull(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { applicant_id: _id } = req._id as ApplicantParamsId;
            const applicantToSet = req.applicantToSet!;

            const applicantUpdated = await applicantRepository.updateFullFields({ _id, applicantToSet });

            if (!applicantUpdated) {
                next(new CustomError(errorsMessagesConstant.notUpdated, HttpStatusEnum.NOT_IMPLEMENTED));
                return;
            }

            res.status(HttpStatusEnum.OK).end();
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { applicant_id } = req._id as ApplicantParamsId;

            const applicantDeleted = await applicantRepository.deleteOne({ applicant_id });

            if (!applicantDeleted) {
                next(new CustomError(errorsMessagesConstant.notUpdated, HttpStatusEnum.NOT_IMPLEMENTED));
                return;
            }

            res.status(HttpStatusEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const applicantController = new ApplicantController();
