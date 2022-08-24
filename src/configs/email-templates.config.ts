import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from './config';
import { NodeEnvironmentEnum } from '../enums';

let pathToEmailTemplates = '';

if (config.NODE_ENVIRONMENT === NodeEnvironmentEnum.DEV) {
    pathToEmailTemplates = 'src';
}

export const emailTemplate = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), pathToEmailTemplates, 'email-templates'),
    },
});
