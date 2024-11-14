
export class SendVerificationCodeCommand {
    constructor(
        readonly email: string,
        readonly verificationCode: string,
    ) {}
}