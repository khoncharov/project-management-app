import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ICreateBoardDto } from '../../models/board.model';
import { IColumn, IUpdateColumnDto } from '../../models/column.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  getColumns(boardId: string): Observable<IColumn[]> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns`;
    return this.http.get<IColumn[]>(url);
  }

  createColumn(boardId: string, board: ICreateBoardDto): Observable<IColumn> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns`;
    return this.http.post<IColumn>(url, board, httpOptionsWithJson);
  }

  // TODO: unknown type
  getColumn(boardId: string, columnId: string): Observable<unknown> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    return this.http.get<unknown>(url);
  }

  deleteColumn(boardId: string, columnId: string): Observable<void> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    return this.http.delete<void>(url);
  }

  updateColumn(
    boardId: string,
    columnId: string,
    column: IUpdateColumnDto,
  ): Observable<void> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    return this.http.put<void>(url, column, httpOptionsWithJson);
  }
}
