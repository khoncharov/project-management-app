export interface User {
  id: string;
  name: string;
  login: string;
}

export interface UpdateUserDto {
  name: string;
  login: string;
  password: string;
}

export interface SignInUserDto {
  login: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  login: string;
  password: string;
}
