type TokenType = 'user/email-confirmation' | 'auth/reset-password';

type TokenTypes = TokenType[];

interface SendMailReturn {
  status: boolean;
  message: any;
}

interface GraphqlContext {
  user: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperUser: boolean;
}

type SendMail = (
  email: string | string[],
  subject: string,
  html: any,
  text?: string,
  attachments?: any[]
) => Promise<{ status: true; message: string } | SendMailReturn>;
