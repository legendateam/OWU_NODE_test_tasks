import { CategoriesEnum, LevelsEnum } from '../../enums';
import { ICommonFieldModel } from './common-field.model.interface';

export interface IApplicantModel extends ICommonFieldModel{
    email: string,
    categories: CategoriesEnum[],
    japaneseKnowledge: boolean,
    level: LevelsEnum
}
