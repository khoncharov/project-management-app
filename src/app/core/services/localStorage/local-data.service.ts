import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  get userToken(): string {
    return localStorage.getItem('user-token') || '';
  }

  set userToken(value: string) {
    localStorage.setItem('user-token', value);
  }

  get userLogin() {
    return localStorage.getItem('user-login') || '';
  }

  set userLogin(value: string) {
    localStorage.setItem('user-login', value);
  }

  get appLang() {
    return localStorage.getItem('app-lang') || '';
  }

  set appLang(value: string) {
    localStorage.setItem('app-lang', value);
  }
}
