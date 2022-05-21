type TokenType = 'user/email-confirmation';

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

type GenerateRandomRegNo = () => number;
type GenerateRandomNumber = (from: number, to: number) => number;
type GenerateArrayOfLength = (num: number) => string[];
