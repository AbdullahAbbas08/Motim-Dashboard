export class LoginResponse {
  message: string;
  isAuthenticated: boolean;
  username: string;
  token: string;
  expiresOn: Date;
}
