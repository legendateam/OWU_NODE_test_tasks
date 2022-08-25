import { PositionParamsId } from '../../types';
import { IPositionModel } from '../models/position.model.interface';
import { IPositionToAdd } from '../position-to-add.interface';

export interface IPositionAbstraction {
    createOne(position: IPositionToAdd): Promise<IPositionModel>,
    getAll(): Promise<IPositionModel[]>,
    getOne({ position_id }: PositionParamsId): Promise<IPositionModel | null>
}
