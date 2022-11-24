import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateBoardDto } from '../../../core/models';

export interface BoardTransferData {
  isNewBoard: boolean;
  board: CreateBoardDto;
}

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss'],
})
export class BoardDialogComponent implements OnInit {
  protected isNewBoard!: boolean;

  protected boardForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: BoardTransferData,
  ) {}

  ngOnInit(): void {
    this.isNewBoard = this.data.isNewBoard;

    this.boardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    if (!this.isNewBoard) {
      this.boardForm.patchValue({
        title: this.data.board.title,
        description: this.data.board.description,
      });
    }
  }
}
