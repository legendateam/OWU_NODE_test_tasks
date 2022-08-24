import { createTransport } from 'nodemailer';

import { config } from './config';

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
    },
});
