import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UpdateUserDto, User } from '../../models/user.model';
import { getUsersUrl, httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = getUsersUrl();
    return this.http.get<User[]>(url);
  }

  getUser(id: string): Observable<User> {
    const url = getUsersUrl(id);
    return this.http.get<User>(url);
  }

  deleteUser(id: string): Observable<null> {
    const url = getUsersUrl(id);
    return this.http.delete<null>(url);
  }

  updateUser(id: string, updatedUser: UpdateUserDto): Observable<User> {
    const url = getUsersUrl(id);
    return this.http.put<User>(url, updatedUser, httpOptionsWithJson);
  }
}
