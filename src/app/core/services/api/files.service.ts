import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { httpOptionsWithFormData } from './utils';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getFile(taskId: string, filename: string): Observable<unknown> {
    const url = `${environment.API_ORIGIN}/file/${taskId}/${filename}`;
    return this.http.get<unknown>(url);
  }

  uploadFile(taskId: string, file: string): Observable<void> {
    const url = `${environment.API_ORIGIN}/file`;
    const body = { taskId, file };
    return this.http.post<void>(url, body, httpOptionsWithFormData);
  }
}
