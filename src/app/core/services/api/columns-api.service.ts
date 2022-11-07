import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  IColumn,
  IColumnWithTasks,
  ICreateColumnDto,
  IUpdateColumnDto,
} from '../../models/column.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ColumnsApiService {
  constructor(private http: HttpClient) {}

  getColumns(boardId: string): Observable<IColumn[]> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns`;
    return this.http.get<IColumn[]>(url);
  }

  createColumn(boardId: string, board: ICreateColumnDto): Observable<IColumn> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns`;
    return this.http.post<IColumn>(url, board, httpOptionsWithJson);
  }

  getColumn(boardId: string, columnId: string): Observable<IColumnWithTasks> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    return this.http.get<IColumnWithTasks>(url);
  }

  deleteColumn(boardId: string, columnId: string): Observable<null> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    return this.http.delete<null>(url);
  }

  updateColumn(
    boardId: string,
    columnId: string,
    column: IUpdateColumnDto,
  ): Observable<IColumn> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    return this.http.put<IColumn>(url, column, httpOptionsWithJson);
  }
}
