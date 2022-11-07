import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UpdateUserDto, User } from '../../models/user.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${environment.API_ORIGIN}/users`;
    return this.http.get<User[]>(url);
  }

  getUser(id: string): Observable<User> {
    const url = `${environment.API_ORIGIN}/users/${id}`;
    return this.http.get<User>(url);
  }

  deleteUser(id: string): Observable<null> {
    const url = `${environment.API_ORIGIN}/users/${id}`;
    return this.http.delete<null>(url);
  }

  updateUser(id: string, updatedUser: UpdateUserDto): Observable<User> {
    const url = `${environment.API_ORIGIN}/users/${id}`;
    return this.http.put<User>(url, updatedUser, httpOptionsWithJson);
  }
}
