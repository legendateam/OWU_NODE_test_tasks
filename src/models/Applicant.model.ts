import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { CategoriesEnum, LevelsEnum } from '../enums';

class Applicant {
    @prop({
        required: true,
        trim: true,
        unique: true,
    })
    public email!: string;

    @prop({
        require: true,
        trim: true,
        default: [],
        lowercase: true,
    })
    public categories!: CategoriesEnum[];

    @prop({
        require: true,
        trim: true,
        lowercase: true,
    })
    public level!: LevelsEnum;

    @prop({
        require: true,
    })
    public japaneseKnowledge!: boolean;
}

export const ApplicantModel: ReturnModelType<typeof Applicant> = getModelForClass(Applicant);
