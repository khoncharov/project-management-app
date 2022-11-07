import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private http: HttpClient) {}

  getErrLogs(): Observable<unknown> {
    return this.http.get(`${environment.API_ORIGIN}/logs/error`, {
      responseType: 'text',
    });
  }

  getInfoLogs(): Observable<unknown> {
    return this.http.get(`${environment.API_ORIGIN}/logs/info`, {
      responseType: 'text',
    });
  }
}
