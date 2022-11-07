import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IUpdateUserDto, IUser } from '../../models/user.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    const url = `${environment.API_ORIGIN}/users`;
    return this.http.get<IUser[]>(url);
  }

  getUser(id: string): Observable<IUser> {
    const url = `${environment.API_ORIGIN}/users/${id}`;
    return this.http.get<IUser>(url);
  }

  deleteUser(id: string): Observable<void> {
    const url = `${environment.API_ORIGIN}/users/${id}`;
    return this.http.delete<void>(url);
  }

  updateUser(userId: string, updatedUser: IUpdateUserDto): Observable<IUser> {
    const url = `${environment.API_ORIGIN}/users/${userId}`;
    return this.http.put<IUser>(url, updatedUser, httpOptionsWithJson);
  }
}
