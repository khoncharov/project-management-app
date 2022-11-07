export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUpdateUserDto {
  name: string;
  login: string;
  password: string;
}

export interface ISignInUserDto {
  login: string;
  password: string;
}

export interface ICreateUserDto {
  name: string;
  login: string;
  password: string;
}
