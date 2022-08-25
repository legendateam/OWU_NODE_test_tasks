import { Request } from 'express';

import { PositionToAdd } from '../types';

export interface IRequestExtended extends Request{
    position?: PositionToAdd
}
