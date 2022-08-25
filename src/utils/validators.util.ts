import Joi from 'joi';

import { PositionToAdd } from '../types';

class ValidatorsUtil {
    public static positionToAddSchema: Joi.ObjectSchema = Joi.object<PositionToAdd>({
        category: Joi.string()
            .trim()
            .lowercase()
            .alphanum()
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
            .required(),
    });

    public static positionToPatchSchema: Joi.ObjectSchema = Joi.object<PositionToAdd>({
        description: Joi.string()
            .trim()
            .optional(),
        japaneseRequired: Joi.boolean()
            .optional(),
    }).allow(null);
}

export const { positionToAddSchema, positionToPatchSchema } = ValidatorsUtil;
