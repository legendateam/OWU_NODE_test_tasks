import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { ApplicantParamsId, ApplicationToAdd, ApplicationToSet } from '../types';
import { applicantToAddSchema, applicantToSetSchema, paramsIdSchema } from '../utils';
import { CustomError } from '../errors';
import { errorsMessagesConstant } from '../constants';
import { HttpStatusEnum } from '../enums';
import { applicantRepository } from '../repositories';

class ApplicantMiddleware {
    public createValidate(req: IRequestExtended, res: Response, next: NextFunction): void {
        try {
            const applicant = req.body as ApplicationToAdd;

            const { error, value } = applicantToAddSchema.validate(applicant);

            if (error) {
                next(new CustomError(errorsMessagesConstant.badRequest, HttpStatusEnum.BAD_REQUEST));
                return;
            }

            req.applicantToAdd = value;
            req.email = value.email;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUniqueEmail(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const email = req.email!;

            const applicant = await applicantRepository.getOneByEmail(email);

            if (applicant) {
                next(new CustomError(errorsMessagesConstant.conflict, HttpStatusEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkParamsOnId(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { applicant_id } = req.params as ApplicantParamsId;
            const { error } = paramsIdSchema.validate({ _id: applicant_id });

            if (error) {
                next(new CustomError(errorsMessagesConstant.missingParams, HttpStatusEnum.BAD_REQUEST));
                return;
            }

            req._id = { applicant_id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExistsById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { applicant_id } = req._id as ApplicantParamsId;

            const applicant = await applicantRepository.getOneById({ applicant_id });

            if (!applicant) {
                next(new CustomError(errorsMessagesConstant.notFoundApplicant, HttpStatusEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateOnFullUpdate(req: IRequestExtended, res: Response, next: NextFunction): void {
        try {
            const applicant = req.body as ApplicationToSet;

            const { error, value } = applicantToSetSchema.validate(applicant);

            if (error) {
                next(new CustomError(errorsMessagesConstant.badRequest, HttpStatusEnum.BAD_REQUEST));
                return;
            }

            req.applicantToSet = value;
            req.email = value.email;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const applicantMiddleware = new ApplicantMiddleware();
