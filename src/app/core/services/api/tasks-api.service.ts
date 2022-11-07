import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CreatedTask,
  CreateTaskDto,
  Task,
  UpdatedTask,
  UpdateTaskDto,
} from '../../models/task.model';
import { httpOptionsWithJson } from './utils';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  constructor(private http: HttpClient) {}

  getTasks(boardId: string, columnId: string): Observable<Task[]> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<Task[]>(url);
  }

  createTask(
    boardId: string,
    columnId: string,
    task: CreateTaskDto,
  ): Observable<CreatedTask> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<CreatedTask>(url, task, httpOptionsWithJson);
  }

  getTask(boardId: string, columnId: string, taskId: string): Observable<Task> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.get<Task>(url);
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
    task: UpdateTaskDto,
  ): Observable<UpdatedTask> {
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    return this.http.put<UpdatedTask>(url, task, httpOptionsWithJson);
  }
}
