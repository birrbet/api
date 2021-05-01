import * as moment from 'moment';

export default class PhoneVerification {
  private readonly _phoneNumber: string;
  private _sessionInfo: string;
  private _lastSentSms: Date;
  private _verified: boolean;
  private _trial: number;

  constructor(
    phoneNumber: string,
    sessionInfo: string,
    lastSentSms: Date,
    verified: boolean,
    trial: number,
  ) {
    this._phoneNumber = phoneNumber;
    this._sessionInfo = sessionInfo;
    this._lastSentSms = lastSentSms;
    this._verified = verified;
    this._trial = trial;
  }

  canResendVerification() {
    let minMinute = 2;
    if (this._trial > 1 && this._trial <= 5) {
      minMinute = this._trial * 5;
    } else if (this._trial > 1) {
      minMinute = this._trial * 10;
    }
    const minMinuteResend = moment(this._trial).add(minMinute, 'minutes');
    return {
      canResendSMS: minMinuteResend.isBefore(moment()),
      canResendAfter: minMinuteResend.fromNow(),
    };
  }

  update(
    sessionInfo?: string,
    lastSentSms?: Date,
    verified?: boolean,
    trial?: number,
  ) {
    this._sessionInfo = sessionInfo ? sessionInfo : this._sessionInfo;
    this._lastSentSms = lastSentSms ? lastSentSms : this._lastSentSms;
    this._verified = verified ? verified : this._verified;
    this._trial = trial ? trial : this._trial;
  }

  toJson() {
    return JSON.stringify({
      phoneNumber: this._phoneNumber,
      sessionInfo: this._sessionInfo,
      lastSentSms: this._lastSentSms,
      verified: this._verified,
      trial: this._trial,
    });
  }
}