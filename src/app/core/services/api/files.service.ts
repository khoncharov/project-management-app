import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export const httpOptionsLoad = {
  headers: new HttpHeaders({
    'Content-Type': 'application/octet-stream',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getFile(taskId: string, filename: string) {
    const url = `${environment.API_ORIGIN}/file/${taskId}/${filename}`;
    return this.http.get(url, httpOptionsLoad);
  }

  uploadFile(taskId: string, file: File): Observable<any> {
    const url = `${environment.API_ORIGIN}/file`;

    const formData = new FormData();
    formData.append('taskId', taskId);
    formData.append('file', file);

    return this.http.post(url, formData);
  }
}
