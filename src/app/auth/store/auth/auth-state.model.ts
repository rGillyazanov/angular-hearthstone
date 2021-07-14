export interface IUser {
  id: number,
  name: string,
  email: string,
  email_verified_at: boolean,
  created_at: string,
  updated_at: string
}

export interface AuthStateModel {
  access_token: string | null;
  user: IUser | null;
}
