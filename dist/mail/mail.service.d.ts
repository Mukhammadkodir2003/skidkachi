import { MailerService } from "@nestjs-modules/mailer";
import { Users } from "../users/models/user.model";
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(user: Users): Promise<void>;
}
