import { ApplicationToAdd } from '../../types/applicant-to-add.type';
import { Position } from '../../types/position.type';

export interface IPositionAbstraction {
    createOne(position: ApplicationToAdd): Promise<Position>,
    getAll(): Promise<Position[]>
}
