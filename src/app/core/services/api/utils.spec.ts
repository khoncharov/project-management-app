import { environment } from '../../../../environments/environment';
import * as Utils from './utils';

describe('Utils', () => {
  it('should be return correct Boards url', () => {
    const boardId = 'some-id-b';
    const url = `${environment.API_ORIGIN}/boards`;
    const urlWithId = `${environment.API_ORIGIN}/boards/${boardId}`;
    expect(Utils.getBoardsUrl()).toEqual(url);
    expect(Utils.getBoardsUrl(boardId)).toEqual(urlWithId);
  });

  it('should be return correct Columns url', () => {
    const boardId = 'some-id-b';
    const columnId = 'some-id-c';
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns`;
    const urlWithId = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}`;
    expect(Utils.getColumnsUrl(boardId)).toEqual(url);
    expect(Utils.getColumnsUrl(boardId, columnId)).toEqual(urlWithId);
  });

  it('should be return correct Tasks url', () => {
    const boardId = 'some-id-b';
    const columnId = 'some-id-c';
    const taskId = 'some-id-t';
    const url = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks`;
    const urlWithId = `${environment.API_ORIGIN}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    expect(Utils.getTasksUrl(boardId, columnId)).toEqual(url);
    expect(Utils.getTasksUrl(boardId, columnId, taskId)).toEqual(urlWithId);
  });
});
