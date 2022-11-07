import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ICreatedTask,
  ICreateTaskDto,
  ITask,
  IUpdatedTask,
  IUpdateTaskDto,
} from '../../models/task.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  constructor(private http: HttpClient) {}

  getTasks(boardId: string, columnId: string): Observable<ITask[]> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<ITask[]>(url);
  }

  createTask(
    boardId: string,
    columnId: string,
    task: ICreateTaskDto,
  ): Observable<ICreatedTask> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<ICreatedTask>(url, task, httpOptionsWithJson);
  }

  getTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<ITask> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.get<ITask>(url);
  }

  deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<null> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.delete<null>(url);
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: IUpdateTaskDto,
  ): Observable<IUpdatedTask> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.put<IUpdatedTask>(url, task, httpOptionsWithJson);
  }
}
