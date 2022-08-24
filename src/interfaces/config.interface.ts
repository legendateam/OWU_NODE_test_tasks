import { NodeEnvironmentEnum } from '../enums';

export interface IConfig {
    PORT: number,
    NODE_ENVIRONMENT: NodeEnvironmentEnum,
    DATABASE_URL: string,
    EMAIL_USER: string,
    EMAIL_PASSWORD: string
}
