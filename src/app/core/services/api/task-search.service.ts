import { Injectable } from '@angular/core';
import {
  map,
  mergeMap,
  tap,
  of,
} from 'rxjs';

import { Task } from '../../models';
import { BoardsApiService } from './boards-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskSearchService {
  private tasks: Task[] = [];

  constructor(private boardApi: BoardsApiService) {}

  getTasks() {
    this.boardApi
      .getBoards()
      .pipe(
        map((boards) => boards.map(({ id }) => id)),
        mergeMap((ids) => ids.map((id) => this.boardApi.getBoard(id).pipe(
          tap((b) => {
            const { id: boardId } = b;
            b.columns.forEach((col) => {
              const { id: columnId } = col;
              col.tasks.forEach((task) => {
                this.tasks.push({
                  ...task,
                  columnId,
                  boardId,
                });
              });
            });
          }),
        ).subscribe())),
      ).subscribe();
    return of(this.tasks);
  }
}
