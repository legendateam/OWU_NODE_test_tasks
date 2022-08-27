import Joi from 'joi';

import { PositionToAdd, QueryParams } from '../types';
import { CategoriesEnum, LevelsEnum } from '../enums';

class ValidatorsUtil {
    public static positionToAddSchema: Joi.ObjectSchema = Joi.object<PositionToAdd>({
        category: Joi.string()
            .trim()
            .lowercase()
            .alphanum()
            .valid(CategoriesEnum.NODEJS, CategoriesEnum.ANGULAR, CategoriesEnum.JAVASCRIPT, CategoriesEnum.REACT)
            .required(),
        company: Joi.string()
            .trim()
            .lowercase()
            .alphanum()
            .required(),
        description: Joi.string()
            .trim()
            .optional(),
        japaneseRequired: Joi.boolean()
            .required(),
        level: Joi.string()
            .trim()
            .lowercase()
            .alphanum()
            .valid(LevelsEnum.JUNIOR, LevelsEnum.MIDDLE, LevelsEnum.SENIOR)
            .required(),
    });

    public static positionToPatchSchema: Joi.ObjectSchema = Joi.object<PositionToAdd>({
        description: Joi.string()
            .trim()
            .optional(),
        japaneseRequired: Joi.boolean()
            .optional(),
    }).allow(null);

    public static positionSearchParams: Joi.ObjectSchema<QueryParams> = Joi.object<QueryParams>({
        category: Joi.string()
            .trim()
            .lowercase()
            .alphanum()
            .valid(CategoriesEnum.NODEJS, CategoriesEnum.ANGULAR, CategoriesEnum.JAVASCRIPT, CategoriesEnum.REACT)
            .optional(),
        level: Joi.string()
            .trim()
            .lowercase()
            .alphanum()
            .valid(LevelsEnum.JUNIOR, LevelsEnum.MIDDLE, LevelsEnum.SENIOR)
            .optional(),
        tag: Joi.string()
            .trim()
            .optional(),
    });
}

export const { positionToAddSchema, positionToPatchSchema, positionSearchParams } = ValidatorsUtil;
