import { Request } from 'express';

import { PositionParamsId, PositionToAdd, PositionToPatch } from '../types';

export interface IRequestExtended extends Request{
    positionToAdd?: PositionToAdd,
    positionToPatch?: PositionToPatch,
    _id?: PositionParamsId
}
