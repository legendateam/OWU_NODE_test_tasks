import { HttpStatusEnum } from '../enums';

export class CustomError extends Error {
    status: HttpStatusEnum | number;

    constructor(message: string, status: HttpStatusEnum | number) {
        super(message);

        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}
