import { PositionParamsId } from '../../types';
import { IPositionModel } from '../models/position.model.interface';
import { IPositionToAdd } from '../position-to-add.interface';
import { IPositionToPatch } from '../position-to-patch.interface';
import { IDeleteFromDb } from '../delete-from-db.interface';
import { IQueryParamsPositions } from '../query-params.interface';

export interface IPositionAbstraction {
    createOne({ position }: IPositionToAdd): Promise<IPositionModel>,
    getAll(): Promise<IPositionModel[]>,
    getOneById({ position_id }: PositionParamsId): Promise<IPositionModel | null>,
    updateField({ position_id: _id, updatesFields }: IPositionToPatch): Promise<IPositionModel | null>,
    deleteOne({ position_id }: PositionParamsId): Promise<IDeleteFromDb>,
    getAllByFiltersWithoutTag(params: IQueryParamsPositions): Promise<IPositionModel[] | null>,
    getAllByFiltersWithTag(params: IQueryParamsPositions): Promise<IPositionModel[] | null>
}
