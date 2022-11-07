import { ITaskShort } from './task.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IColumnWithTasks extends IColumn {
  tasks: ITaskShort[];
}

export interface ICreateColumnDto {
  title: string;
}

export interface IUpdateColumnDto {
  title: string;
  order: number;
}
