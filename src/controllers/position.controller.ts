import { NextFunction, Response } from 'express';

import { positionRepository } from '../repositories';
import { EmailTypeTemplateEnum, HttpStatusEnum } from '../enums';
import { CustomError } from '../errors';
import { errorsMessagesConstant } from '../constants';
import { PositionParamsId, PositionToAdd } from '../types';
import { IRequestExtended } from '../interfaces';
import { applicantService, emailService, positionService } from '../services';

class PositionController {
    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const params = req.searchParams;

            if (params) {
                const allPositionsByFilters = await positionService.searchPositionsByFilters(params);

                if (!allPositionsByFilters?.length) {
                    next(new CustomError(errorsMessagesConstant.notFoundPositions, HttpStatusEnum.NOT_FOUND));
                    return;
                }

                res.status(HttpStatusEnum.OK).json(allPositionsByFilters);
                return;
            }

            const positions = await positionRepository.getAll();

            if (!positions.length) {
                next(new CustomError(errorsMessagesConstant.notFoundPositions, HttpStatusEnum.NOT_FOUND));
                return;
            }

            res.status(HttpStatusEnum.OK).json(positions);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const position_id = req._id as PositionParamsId;

            const position = await positionRepository.getOneById(position_id);

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
            const position = req.positionToAdd as PositionToAdd;
            const positionCreated = await positionRepository.createOne({ position });

            if (!positionCreated) {
                next(new CustomError(errorsMessagesConstant.notImplemented, HttpStatusEnum.NOT_IMPLEMENTED));
                return;
            }

            const applicants = await applicantService.getAllByFiltersForEmailSend(positionCreated);

            applicants?.forEach((applicant) => {
                emailService.sendMessage(applicant.email, EmailTypeTemplateEnum.NEW_POSITION, {
                    position_category: positionCreated.category,
                    position_company: positionCreated.company,
                    position_level: positionCreated.level,
                    position_japaneseRequired: `${positionCreated.japaneseRequired}`,
                });
            });

            const id = positionCreated._id;
            res.status(HttpStatusEnum.CREATED).location(`${id}`).end();
        } catch (e) {
            next(e);
        }
    }

    public async updateOnePartial(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { position_id } = req._id as PositionParamsId;
            const updatesFields = req.positionToPatch!;

            const positionUpdated = await positionRepository.updateField({ position_id, updatesFields });
            if (!positionUpdated) {
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
            const { position_id } = req._id as PositionParamsId;
            const position = req.positionModel!;

            const positionDeleted = await positionRepository.deleteOne({ position_id });

            if (!positionDeleted.deletedCount) {
                next(new CustomError(errorsMessagesConstant.notDelete, HttpStatusEnum.NOT_IMPLEMENTED));
                return;
            }

            const applicants = await applicantService.getAllByFiltersForEmailSend(position);

            applicants?.forEach((applicant) => {
                emailService.sendMessage(applicant.email, EmailTypeTemplateEnum.NEW_POSITION, {
                    position_category: position.category,
                    position_company: position.company,
                    position_level: position.level,
                    position_japaneseRequired: `${position.japaneseRequired}`,
                });
            });

            res.status(HttpStatusEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const positionsController = new PositionController();
