import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { BoardWithColumns } from '../../models';

import {
  CreatedTask,
  CreateTaskDto,
  Task,
  UpdatedTask,
  UpdateTaskDto,
} from '../../models/task.model';
import { BoardsApiService } from './boards-api.service';
import { getTasksUrl, httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  constructor(private http: HttpClient, private boardApi: BoardsApiService) {}

  getTasks(boardId: string, columnId: string): Observable<Task[]> {
    const url = getTasksUrl(boardId, columnId);
    return this.http.get<Task[]>(url);
  }

  createTask(
    boardId: string,
    columnId: string,
    task: CreateTaskDto,
  ): Observable<CreatedTask> {
    const url = getTasksUrl(boardId, columnId);
    return this.http.post<CreatedTask>(url, task, httpOptionsWithJson);
  }

  getTask(boardId: string, columnId: string, taskId: string): Observable<Task> {
    const url = getTasksUrl(boardId, columnId, taskId);
    return this.http.get<Task>(url);
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: UpdateTaskDto,
  ): Observable<UpdatedTask> {
    const url = getTasksUrl(boardId, columnId, taskId);
    return this.http.put<UpdatedTask>(url, task, httpOptionsWithJson);
  }

  deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<null> {
    const url = getTasksUrl(boardId, columnId, taskId);
    return this.http.delete<null>(url);
  }

  createTaskAndGetBoard(
    boardId: string,
    columnId: string,
    task: CreateTaskDto,
  ): Observable<BoardWithColumns> {
    return this.createTask(boardId, columnId, task).pipe(
      mergeMap(() => this.boardApi.getBoard(boardId)),
    );
  }

  updateTaskAndGetBoard(
    boardId: string,
    columnId: string,
    taskId: string,
    task: UpdateTaskDto,
  ): Observable<BoardWithColumns> {
    return this.updateTask(boardId, columnId, taskId, task).pipe(
      mergeMap(() => this.boardApi.getBoard(boardId)),
    );
  }

  deleteTaskAndGetBoard(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<BoardWithColumns> {
    return this.deleteTask(boardId, columnId, taskId).pipe(
      mergeMap(() => this.boardApi.getBoard(boardId)),
    );
  }
}
