import { PositionModel } from '../models/Position.model';
import { IPositionAbstraction, IPositionModel, IPositionToAdd } from '../interfaces';
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
}

export const positionRepository = new PositionRepository();
