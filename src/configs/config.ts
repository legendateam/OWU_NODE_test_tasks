import dotenv from 'dotenv';

import { IConfig } from '../interfaces';
import { NodeEnvironmentEnum } from '../enums';

dotenv.config();

export const config: IConfig = {
    PORT: Number(process.env.PORT) || 3400,
    NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT as NodeEnvironmentEnum || NodeEnvironmentEnum.DEV,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/owu_node_test_task',
    EMAIL_USER: process.env.EMAIL_USER || 'noname@gmail.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'qwerty12345',
    MY_COMPANY_NAME: process.env.MY_COMPANY_NAME || 'Great Work',
    EMAIL_SUPPORT: process.env.MY_COMPANY_EMAIL || 'greatworksupport@gmail.com',
    MY_COMPANY_ADDRESS: process.env.MY_COMPANY_ADDRESS || '2132 Thomas Street, Wheeling, Illinois, 60090',
};
