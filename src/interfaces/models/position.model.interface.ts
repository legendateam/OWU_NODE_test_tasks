import { CategoriesEnum, LevelsEnum } from '../../enums';
import { ICommonFieldModel } from './common-field.model.interface';

export interface IPositionModel extends ICommonFieldModel{
    category: CategoriesEnum,
    level: LevelsEnum,
    company: string,
    description?: string,
    japaneseRequired: boolean
}
