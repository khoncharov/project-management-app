/* eslint-disable object-curly-newline */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-column-title-input',
  templateUrl: './column-title-input.component.html',
  styleUrls: ['./column-title-input.component.scss'],
})
export class ColumnTitleInputComponent {
  @Input() columnTitle!: string;

  @Output() cancelEvent = new EventEmitter();

  @Output() submitEvent = new EventEmitter<string>();

  onCancel(): void {
    this.cancelEvent.emit();
  }

  onSubmit(): void {
    if (this.columnTitle) {
      this.submitEvent.emit(this.columnTitle);
    }
  }
}
