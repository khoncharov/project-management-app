import { IColumnWithTasks } from './column.model';

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardWithColumns extends IBoard {
  columns: IColumnWithTasks;
}

export interface ICreateBoardDto {
  title: string;
  description: string;
}

export interface IUpdateBoardDto {
  title: string;
  description: string;
}
