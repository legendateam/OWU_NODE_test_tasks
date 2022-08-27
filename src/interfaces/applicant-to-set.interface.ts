import { ApplicationToSet } from '../types';
import { IIdParams } from './id-params.interface';

export interface IApplicantToSet extends IIdParams{
    applicantToSet: ApplicationToSet
}
