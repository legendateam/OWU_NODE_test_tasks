import { PositionModel } from '../models/Position.model';
import {
    IDeleteFromDb,
    IPositionAbstraction, IPositionModel, IPositionToAdd, IPositionToPatch,
} from '../interfaces';
import { PositionParamsId } from '../types';

class PositionRepository implements IPositionAbstraction {
    public async createOne(position: IPositionToAdd): Promise<IPositionModel> {
        return PositionModel.create(position);
    }

    public async getAll(): Promise<IPositionModel[]> {
        return PositionModel.find();
    }

    public async getOne({ position_id }: PositionParamsId): Promise<IPositionModel | null> {
        return PositionModel.findOne({ _id: position_id });
    }

    public async updateField({ position_id: _id, updatesFields }: IPositionToPatch): Promise<IPositionModel | null> {
        return PositionModel.findByIdAndUpdate(_id, updatesFields);
    }

    public async deleteOne({ position_id }: PositionParamsId): Promise<IDeleteFromDb> {
        return PositionModel.deleteOne({ _id: position_id });
    }
}

export const positionRepository = new PositionRepository();
