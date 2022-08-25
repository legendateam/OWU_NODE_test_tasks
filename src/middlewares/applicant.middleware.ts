import { NextFunction, Response } from 'express';

import { positionSchema } from '../utils';
import { CustomError } from '../errors';
import { HttpStatusEnum } from '../enums';
import { Position } from '../types';
import { IRequestExtended } from '../interfaces';

class ApplicantMiddleware {

}

export const applicantMiddleware = new ApplicantMiddleware();
