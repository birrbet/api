export interface IPhoneVerification {
    phoneNumber: string;
    reCaptchaToken: string;
}

export interface IPhoneCodeVerification {
    phoneNumber: string;
    code: string;
}

export interface IPhoneVerificationResponse {
    status: number;
    statusText: string;
}