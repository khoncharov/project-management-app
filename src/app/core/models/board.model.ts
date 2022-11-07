import { IColumnData } from './column.model';

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardData extends IBoard {
  columns: IColumnData;
}

export interface ICreateBoardDto {
  title: string;
  description: string;
}

export interface IUpdateBoardDto {
  title: string;
  description: string;
}
