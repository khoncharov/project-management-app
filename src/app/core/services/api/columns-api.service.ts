import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  Column,
  ColumnWithTasks,
  CreateColumnDto,
  UpdateColumnDto,
} from '../../models/column.model';
import { getColumnsUrl, httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ColumnsApiService {
  constructor(private http: HttpClient) {}

  getColumns(boardId: string): Observable<Column[]> {
    const url = getColumnsUrl(boardId);
    return this.http.get<Column[]>(url);
  }

  createColumn(boardId: string, column: CreateColumnDto): Observable<Column> {
    const url = getColumnsUrl(boardId);
    return this.http.post<Column>(url, column, httpOptionsWithJson);
  }

  getColumn(boardId: string, columnId: string): Observable<ColumnWithTasks> {
    const url = getColumnsUrl(boardId, columnId);
    return this.http.get<ColumnWithTasks>(url);
  }

  updateColumn(
    boardId: string,
    columnId: string,
    column: UpdateColumnDto,
  ): Observable<Column> {
    const url = getColumnsUrl(boardId, columnId);
    return this.http.put<Column>(url, column, httpOptionsWithJson);
  }

  deleteColumn(boardId: string, columnId: string): Observable<null> {
    const url = getColumnsUrl(boardId, columnId);
    return this.http.delete<null>(url);
  }

  deleteColumnAndGetId(
    boardId: string,
    columnId: string,
  ): Observable<{ id: string }> {
    return this.deleteColumn(boardId, columnId).pipe(
      map(() => ({ id: columnId })),
    );
  }
}
