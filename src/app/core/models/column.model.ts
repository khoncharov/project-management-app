import { ITaskShort } from './task.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IColumnData extends IColumn {
  tasks: ITaskShort[];
}

export interface ICreateColumnDto {
  title: string;
}

export interface IUpdateColumnDto {
  title: string;
  order: number;
}
