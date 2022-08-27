import { IApplicantModel, IPositionModel } from '../interfaces';
import { applicantRepository } from '../repositories';

export class ApplicantService {
    public async getAllByFiltersForEmailSend({ category, level, japaneseRequired }: IPositionModel)
        : Promise<IApplicantModel[] | null> {
        if (!japaneseRequired) {
            return applicantRepository
                .getAllByFilters({ category, level });
        }
        return applicantRepository
            .getAllByFilters({ category, level, japaneseKnowledge: japaneseRequired });
    }
}

export const applicantService = new ApplicantService();
