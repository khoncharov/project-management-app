import { TaskShort } from './task.model';

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface ColumnWithTasks extends Column {
  tasks: TaskShort[];
}

export interface CreateColumnDto {
  title: string;
}

export interface UpdateColumnDto {
  title: string;
  order: number;
}
