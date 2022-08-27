import Joi from 'joi';

import { ApplicationToAdd, PositionToAdd, QueryParams } from '../types';
import { commonValidatorUtil } from './common-validator.util';
import { RegexConstant } from '../constants';
import {IIdParams} from "../interfaces";

class ValidatorsUtil {
    public static positionToAddSchema: Joi.ObjectSchema = Joi.object<PositionToAdd>({
        category: commonValidatorUtil.category
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
        level: commonValidatorUtil.level
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
        category: commonValidatorUtil.category
            .optional(),
        level: commonValidatorUtil.level
            .optional(),
        tag: Joi.string()
            .trim()
            .optional(),
    });

    public static applicantToAddSchema: Joi.ObjectSchema<ApplicationToAdd> = Joi.object<ApplicationToAdd>({
        level: commonValidatorUtil.level
            .required(),
        email: Joi.string().email().trim().lowercase()
            .required(),
        categories: Joi.array().items(commonValidatorUtil.category)
            .required(),
        japaneseKnowledge: Joi.boolean()
            .required(),
    });

    public static applicantToSetSchema = this.applicantToAddSchema;

    public static paramsIdSchema: Joi.ObjectSchema<IIdParams> = Joi.object<IIdParams>({
        _id: Joi.string().regex(RegexConstant.mongoId)
            .required(),
    });
}

export const {
    positionToAddSchema,
    positionToPatchSchema,
    positionSearchParams,
    applicantToAddSchema,
    applicantToSetSchema,
    paramsIdSchema,
} = ValidatorsUtil;
