import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import PhoneVerificationDTO, {
  PhoneCodeVerificationDTO,
} from './phone-verification.dto';
import { google } from 'googleapis';
import PhoneVerification from './phone-verification';
import { ConfigService } from '@nestjs/config';
import RedisService from 'src/infrastructure/redis/redis.service';
import { AccountService } from 'src/modules/account/account.service';
@Injectable()
export default class PhoneService {
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService
  ) {}
  sendNotification(to: string, details?: { message: string }): boolean {
    return false;
  }

  async handleCodeVerification(
    phoneCodeVerification: PhoneCodeVerificationDTO,
  ) {
    const { phoneNumber, code } = phoneCodeVerification;
    let verificationDoc = await this.redisService.getValue(phoneNumber);
    if (!verificationDoc) {
      throw new NotFoundException(
        `No registered phone found by ${phoneNumber}`,
      );
    }
    verificationDoc = JSON.parse(verificationDoc);
    if (!verificationDoc.sessionInfo) {
      throw new NotFoundException(
        `No registered phone found by ${phoneNumber}`,
      );
    }
    const { sessionInfo } = verificationDoc;

    const verification = await this.verifyPhoneCode(sessionInfo, code);
    verificationDoc.verified = true;
    const user = await this.accountService.findByUsername(phoneNumber);
    this.accountService.updateActive(user.id, true);
    this.redisService.setValue(
      phoneNumber,
      JSON.stringify({
        ...verificationDoc,
        verified: true,
      }),
    );
    return verification;
  }
  async handleSendVerification(phoneVerification: PhoneVerificationDTO) {
    const existingDoc = await this.redisService.getValue(
      phoneVerification.phoneNumber,
    );
    if (existingDoc) {
      const {
        phoneNumber,
        sessionInfo,
        lastSentSms,
        verified,
        trial,
      } = JSON.parse(existingDoc);
      const pV = new PhoneVerification(
        phoneNumber,
        sessionInfo,
        lastSentSms,
        verified,
        trial,
      );
      const { canResendSMS, canResendAfter } = pV.canResendVerification();
      if (canResendSMS) {
        const sessionInfo = await this.sendVerificationSMS(phoneVerification);
        pV.update(sessionInfo, new Date(), undefined, existingDoc.trial + 1);
        this.redisService.setValue(phoneNumber, pV.toJson());
        return pV.toJson();
      }
    }

    const sessionInfo = await this.sendVerificationSMS(phoneVerification);
    const pV = new PhoneVerification(
      phoneVerification.phoneNumber,
      sessionInfo,
      new Date(),
      false,
      1,
    );
    this.redisService.setValue(phoneVerification.phoneNumber, pV.toJson());
    return pV.toJson();
  }
  private async sendVerificationSMS(phoneVerification: PhoneVerificationDTO) {
    try {
      const response = await google
        .identitytoolkit({
          auth: this.configService.get<string>('GOOGLE_API_KEY'),
          version: 'v3',
        })
        .relyingparty.sendVerificationCode({
          requestBody: {
            phoneNumber: phoneVerification.phoneNumber,
            recaptchaToken: phoneVerification.reCaptchaToken,
          },
        });
      const { sessionInfo } = response.data;
      return sessionInfo;
    } catch (error) {
      const message =
        error.code && error.code === 406
          ? 'ReCaptcha error'
          : 'An unknown verification error occured';
      console.log(error, process.env.GOOGLE_API_KEY);
      throw new HttpException(message, 500);
    }
  }
  private async verifyPhoneCode(sessionInfo: string, code: string) {
    try {
      const response = await google
        .identitytoolkit({
          auth: this.configService.get<string>('GOOGLE_API_KEY'),
          version: 'v3',
        })
        .relyingparty.verifyPhoneNumber({
          requestBody: {
            code,
            sessionInfo,
          },
        });
      if (response.status === 200) {
        return { status: response.status, statusText: response.statusText };
      }
      throw new HttpException(response.statusText, response.status);
    } catch (error) {
      const message =
        error.code && error.code === 400
          ? 'The code entered is invalid'
          : 'An unknown verification error occurred';
      throw new HttpException(message, 500);
    }
  }
}