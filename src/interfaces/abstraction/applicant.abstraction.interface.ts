import { IApplicantModel } from '../models/applicant.model.interface';
import { ApplicantParamsId, ApplicationToAdd } from '../../types';
import { IDeleteFromDb } from '../delete-from-db.interface';
import { IApplicantToSet } from '../applicant-to-set.interface';

export interface IApplicantAbstraction {
    getOneByEmail(email: string): Promise<IApplicantModel | null>,
    getOneById({ applicant_id }: ApplicantParamsId): Promise<IApplicantModel | null>,
    addOne(applicationToAdd: ApplicationToAdd): Promise<IApplicantModel>,
    updateFullFields({ _id, applicantToSet }: IApplicantToSet): Promise<IApplicantModel | null>,
    deleteOne({ applicant_id }: ApplicantParamsId):Promise<IDeleteFromDb>
}
