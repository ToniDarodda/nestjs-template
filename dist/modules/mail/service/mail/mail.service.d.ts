export declare class MailService {
    private readonly logger;
    private transporter;
    constructor();
    sendMail(to: string, subject: string, text: string, htmlFilePath: string): Promise<void>;
}
