import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import MaterialModule from './material/material.module';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [CommonModule, MaterialModule],
})
export class SharedModule {}
