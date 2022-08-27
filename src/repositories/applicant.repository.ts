import { ApplicantModel } from '../models/Applicant.model';
import {
    IApplicantAbstraction, IApplicantModel, IApplicantToSet, IDeleteFromDb,
} from '../interfaces';
import { ApplicantParamsId, ApplicationToAdd } from '../types';

class ApplicantRepository implements IApplicantAbstraction {
    public async getOneByEmail(email: string): Promise<IApplicantModel | null> {
        return ApplicantModel.findOne({ email });
    }

    public async getOneById({ applicant_id }: ApplicantParamsId): Promise<IApplicantModel | null> {
        return ApplicantModel.findById(applicant_id);
    }

    public async addOne(applicationToAdd: ApplicationToAdd): Promise<IApplicantModel> {
        return ApplicantModel.create(applicationToAdd);
    }

    public async deleteOne({ applicant_id }: ApplicantParamsId): Promise<IDeleteFromDb> {
        return ApplicantModel.deleteOne({ _id: applicant_id });
    }

    public async updateFullFields({ _id, applicantToSet }: IApplicantToSet): Promise<IApplicantModel | null> {
        return ApplicantModel.findByIdAndUpdate(_id, applicantToSet);
    }
}
export const applicantRepository = new ApplicantRepository();
