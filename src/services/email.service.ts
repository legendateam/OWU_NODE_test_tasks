import { emailTemplate, config, transporter } from '../configs';
import { emailTemplateConstant } from '../constants';
import { EmailTypeTemplateEnum } from '../enums';
import { IEmailCommonContext, IEmailContext } from '../interfaces';

class EmailService {
    public async sendMessage(email: string, type: EmailTypeTemplateEnum, context: IEmailContext): Promise<void> {
        const { subject, template } = emailTemplateConstant[type];

        const commonContext = {
            email_support: config.EMAIL_SUPPORT,
            my_company_address: config.MY_COMPANY_ADDRESS,
            my_company_name: config.MY_COMPANY_NAME,
        } as IEmailCommonContext;

        const unitedContext = Object.assign(context, commonContext);

        const html = await emailTemplate.render(template, unitedContext);

        await transporter.sendMail({
            from: config.EMAIL_USER,
            to: email,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
