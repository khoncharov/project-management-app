import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ICreateUserDto, ISignInUserDto, IUser } from '../../models/user.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  signIn(user: ISignInUserDto): Observable<{ token: string }> {
    const url = `${environment.API_ORIGIN}/signin`;
    return this.http.post<{ token: string }>(url, user, httpOptionsWithJson);
  }

  signUp(user: ICreateUserDto): Observable<IUser> {
    const url = `${environment.API_ORIGIN}/signup`;
    return this.http.post<IUser>(url, user, httpOptionsWithJson);
  }
}
