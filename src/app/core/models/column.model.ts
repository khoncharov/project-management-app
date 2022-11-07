import { ITask } from './task.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface ICreateColumnDto {
  title: string;
}

export interface IUpdateColumnDto {
  title: string;
  order: number;
}

// TODO: check type
export interface IColumnData extends IColumn {
  tasks: ITask[];
}
