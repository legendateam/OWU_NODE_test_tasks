import { transporter } from '../configs/email-transporter.config';
import { config } from '../configs';
import { emailTemplate } from '../configs/email-templates.config';
import { emailTemplateConstant } from '../constants';
import { EmailTypeTemplateEnum } from '../enums';

class EmailService {
    public async sendMessage(email: string, type: EmailTypeTemplateEnum): Promise<void> {
        const { subject, template } = emailTemplateConstant[type];

        const html = await emailTemplate.render(template);

        await transporter.sendMail({
            from: config.EMAIL_USER,
            to: email,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
