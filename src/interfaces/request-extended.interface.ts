import { Request } from 'express';

import { PositionParamsId, PositionToAdd, PositionToPatch } from '../types';
import { IQueryParams } from './query-params.interface';

export interface IRequestExtended extends Request{
    positionToAdd?: PositionToAdd,
    positionToPatch?: PositionToPatch,
    _id?: PositionParamsId,
    searchParams?: IQueryParams
}
