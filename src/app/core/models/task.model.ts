import { IFileInfo } from './file-info.model';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: IFileInfo[];
}

export interface ITaskShort extends Omit<ITask, 'boardId' | 'columnId'> {}

export interface ICreateTaskDto {
  title: string;
  description: string;
  userId: string;
}

export interface ICreatedTask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IUpdateTaskDto {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IUpdatedTask extends IUpdateTaskDto {
  id: string;
}
