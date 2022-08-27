import { Request } from 'express';

import {
    ApplicantParamsId,
    ApplicationToAdd, ApplicationToSet, PositionParamsId, PositionToAdd, PositionToPatch,
} from '../types';
import { IQueryParamsPositions } from './query-params.interface';

export interface IRequestExtended extends Request{
    positionToAdd?: PositionToAdd,
    positionToPatch?: PositionToPatch,
    _id?: ApplicantParamsId | PositionParamsId,
    searchParams?: IQueryParamsPositions,
    applicantToAdd?: ApplicationToAdd,
    applicantToSet?: ApplicationToSet,
    email?: string
}
