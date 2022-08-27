import { CategoriesEnum, LevelsEnum } from '../enums';

export interface IQueryParams {
    category?: CategoriesEnum,
    level?: LevelsEnum,
    tag?: string
}
