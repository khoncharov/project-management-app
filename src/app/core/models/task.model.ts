import { FileInfo } from './file-info.model';

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
  files: FileInfo[];
}

export interface TaskShort extends Omit<Task, 'boardId' | 'columnId'> {}

export interface CreateTaskDto {
  title: string;
  description: string;
  userId: string | null;
}

export interface CreatedTask extends CreateTaskDto {
  id: string;
  order: number;
  boardId: string;
  columnId: string;
}

export interface UpdateTaskDto {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export interface UpdatedTask extends UpdateTaskDto {
  id: string;
}
