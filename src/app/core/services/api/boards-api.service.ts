import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Board,
  BoardWithColumns,
  CreateBoardDto,
  UpdateBoardDto,
} from '../../models/board.model';
import { getBoardsUrl, httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class BoardsApiService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    const url = getBoardsUrl();
    return this.http.get<Board[]>(url);
  }

  createBoard(board: CreateBoardDto): Observable<Board> {
    const url = getBoardsUrl();
    return this.http.post<Board>(url, board, httpOptionsWithJson);
  }

  getBoard(id: string): Observable<BoardWithColumns> {
    const url = getBoardsUrl(id);
    return this.http.get<BoardWithColumns>(url);
  }

  deleteBoard(id: string): Observable<null> {
    const url = getBoardsUrl(id);
    return this.http.delete<null>(url);
  }

  updateBoard(id: string, board: UpdateBoardDto): Observable<Board> {
    const url = getBoardsUrl(id);
    return this.http.put<Board>(url, board, httpOptionsWithJson);
  }
}
