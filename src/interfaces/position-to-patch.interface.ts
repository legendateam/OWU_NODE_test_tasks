import { PositionParamsId, PositionToPatch } from '../types';

export interface IPositionToPatch extends PositionParamsId{
    updatesFields: PositionToPatch
}
