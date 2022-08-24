import { ApplicationToAdd } from '../types/applicant-to-add.type';
import { PositionModel } from '../models/Position.model';
import { IPositionAbstraction } from '../interfaces/abstraction/position.abstraction.interface';
import { Position } from '../types/position.type';

class PositionRepository implements IPositionAbstraction {
    public async createOne(position: ApplicationToAdd): Promise<Position> {
        return PositionModel.create(position);
    }

    public async getAll(): Promise<Position[]> {
        return PositionModel.find();
    }
}

export const positionRepository = new PositionRepository();
