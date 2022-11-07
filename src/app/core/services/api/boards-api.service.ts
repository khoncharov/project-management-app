import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  IBoard,
  IBoardWithColumns,
  ICreateBoardDto,
  IUpdateBoardDto,
} from '../../models/board.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class BoardsApiService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<IBoard[]> {
    const url = `${environment.API_ORIGIN}/boards`;
    return this.http.get<IBoard[]>(url);
  }

  createBoard(board: ICreateBoardDto): Observable<IBoard> {
    const url = `${environment.API_ORIGIN}/boards`;
    return this.http.post<IBoard>(url, board, httpOptionsWithJson);
  }

  getBoard(id: string): Observable<IBoardWithColumns> {
    const url = `${environment.API_ORIGIN}/boards/${id}`;
    return this.http.get<IBoardWithColumns>(url);
  }

  deleteBoard(id: string): Observable<null> {
    const url = `${environment.API_ORIGIN}/boards/${id}`;
    return this.http.delete<null>(url);
  }

  updateBoard(id: string, board: IUpdateBoardDto): Observable<IBoard> {
    const url = `${environment.API_ORIGIN}/boards/${id}`;
    return this.http.put<IBoard>(url, board, httpOptionsWithJson);
  }
}
