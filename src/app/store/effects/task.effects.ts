/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { TasksApiService } from '../../core/services/api/tasks-api.service';
import * as TaskActions from '../actions/task.actions';
import * as TaskApiActions from '../actions/task-api.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskApi: TasksApiService) {}

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.getTasks),
      mergeMap((payload) => {
        return this.taskApi.getTasks(payload.boardId, payload.columnId).pipe(
          map((tasks) => TaskApiActions.getTasksSuccess({ tasks })),
          catchError((error) => of(TaskApiActions.getTasksFailure({ error }))),
        );
      }),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap((payload) => {
        return this.taskApi
          .createTaskAndGetColumns(
            payload.boardId,
            payload.columnId,
            payload.task,
          )
          .pipe(
            map((board) => TaskApiActions.createTaskSuccess({ board })),
            catchError((error) =>
              of(TaskApiActions.createTaskFailure({ error })),
            ),
          );
      }),
    );
  });

  getTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.getTask),
      mergeMap((payload) => {
        return this.taskApi
          .getTask(payload.boardId, payload.columnId, payload.taskId)
          .pipe(
            map((task) => TaskApiActions.getTaskSuccess({ task })),
            catchError((error) => of(TaskApiActions.getTaskFailure({ error }))),
          );
      }),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap((payload) => {
        return this.taskApi
          .updateTaskAndGetColumns(
            payload.boardId,
            payload.columnId,
            payload.taskId,
            payload.task,
          )
          .pipe(
            map((board) => TaskApiActions.updateTaskSuccess({ board })),
            catchError((error) =>
              of(TaskApiActions.updateTaskFailure({ error })),
            ),
          );
      }),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap((payload) => {
        return this.taskApi
          .deleteTaskAndGetColumns(
            payload.boardId,
            payload.columnId,
            payload.taskId,
          )
          .pipe(
            map((board) => TaskApiActions.deleteTaskSuccess({ board })),
            catchError((error) =>
              of(TaskApiActions.deleteTaskFailure({ error })),
            ),
          );
      }),
    );
  });
}
