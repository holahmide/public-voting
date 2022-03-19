type TokenType = 'user/email-confirmation' | 'auth/reset-password';

type TokenTypes = TokenType[];

interface SendMailReturn {
  status: boolean;
  message: any;
}

type SendMail = (
  email: string | string[],
  subject: string,
  html: any,
  text?: string,
  attachments?: any[]
) => Promise<{ status: true; message: string } | SendMailReturn>;
