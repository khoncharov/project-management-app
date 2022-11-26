import { Injectable } from '@angular/core';

import { ErrType } from '../../../store/reducers/auth.reducer';
import * as AuthActions from '../../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class ErrorDescriptionService {
  get(err: ErrType): string {
    switch (err.code) {
      case 400: // **Bad Request**
        return `Bad request [Code: ${err.code}]`;
      case 401: // **Unauthorized**
        // `Не авторизированный доступ. Пожалуйста, зайдите под своим
        // пользователем или зарегистрируйтесь [Код: ${err.code}]`;
        return `Unauthorized access. Please, login or register first [Code: ${err.code}]`;
      case 403: // **Forbidden**
        if (err.action === AuthActions.loginUser) {
          // `Неверный логин или пароль [Код: ${err.code}]`;
          return `Incorrect login or password [Code: ${err.code}]`;
        }
        // `Доступ запрещен [Код: ${err.code}]`;
        return `Access forbidden [Code: ${err.code}]`;
      case 404: // **Not Found**
        // `Данные не найдены. Попробуйте обновить страницу [Код: ${err.code}]`;
        return `Data not found. Try to reload the page [Code: ${err.code}]`;
      case 408: // **Request Timeout**
        // `Время ожидания запроса истекло [Код: ${err.code}]`;
        return `Request Timeout [Code: ${err.code}]`;
      case 409: // **Conflict**
        if (err.action === AuthActions.registerUser) {
          // `Пользователь с таким уже логином существует [Код: ${err.code}]`;
          return `User with the same login already exists [Code: ${err.code}]`;
        }
        // `Конфликт данных [Код: ${err.code}]`;
        return `Data conflict [Code: ${err.code}]`;

      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
      case 506:
      case 507:
      case 508:
      case 510:
      case 511:
        // `Ошибка сервера [Код: ${err.code}]`;
        return `Server error [Code: ${err.code}]`;

      default:
        // `Неизвестная ошибка [Код: ${err.code}]`;
        return `Unknown error [Code: ${err.code}]`;
    }
  }
}
