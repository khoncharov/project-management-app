import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CreateUserDto, SignInUserDto, User } from '../../models/user.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  signIn(user: SignInUserDto): Observable<{ token: string }> {
    const url = `${environment.API_ORIGIN}/signin`;
    return this.http.post<{ token: string }>(url, user, httpOptionsWithJson);
  }

  signUp(user: CreateUserDto): Observable<User> {
    const url = `${environment.API_ORIGIN}/signup`;
    return this.http.post<User>(url, user, httpOptionsWithJson);
  }
}
