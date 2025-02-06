import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Users } from "../users/models/user.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: Users) {
    const url = `${process.env.API_URL}/api/users/activate/${user.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Skidkachiga xush kelibsiz",
      template: "./confirm",
      context: {
        name: user.name,
        url,
      },
    });
  }
}
