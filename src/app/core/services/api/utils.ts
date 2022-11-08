import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

export const httpOptionsWithJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export const httpOptionsWithFormData = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  }),
};

export const getUsersUrl = (userId?: string): string => {
  if (userId) {
    return `${environment.API_ORIGIN}/users/${userId}`;
  }
  return `${environment.API_ORIGIN}/users`;
};

export const getBoardsUrl = (boardId?: string): string => {
  if (boardId) {
    return `${environment.API_ORIGIN}/boards/${boardId}`;
  }
  return `${environment.API_ORIGIN}/boards`;
};

export const getColumnsUrl = (boardId: string, columnId?: string): string => {
  if (columnId) {
    return `${getBoardsUrl(boardId)}/columns/${columnId}`;
  }
  return `${getBoardsUrl(boardId)}/columns`;
};

export const getTasksUrl = (
  boardId: string,
  columnId: string,
  taskId?: string,
): string => {
  if (taskId) {
    return `${getColumnsUrl(boardId, columnId)}/tasks/${taskId}`;
  }
  return `${getColumnsUrl(boardId, columnId)}/tasks`;
};
