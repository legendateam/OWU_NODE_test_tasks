import { PositionParamsId } from '../../types';
import { IPositionModel } from '../models/position.model.interface';
import { IPositionToAdd } from '../position-to-add.interface';
import { IPositionToPatch } from '../position-to-patch.interface';
import { IDeleteFromDb } from '../delete-from-db.interface';
import { IQueryParams } from '../query-params.interface';

export interface IPositionAbstraction {
    createOne(position: IPositionToAdd): Promise<IPositionModel>,
    getAll(): Promise<IPositionModel[]>,
    getOne({ position_id }: PositionParamsId): Promise<IPositionModel | null>,
    updateField({ position_id: _id, updatesFields }: IPositionToPatch): Promise<IPositionModel | null>,
    deleteOne({ position_id }: PositionParamsId): Promise<IDeleteFromDb>,
    getAllByFilters(params: IQueryParams): Promise<IPositionModel[] | null>
}
