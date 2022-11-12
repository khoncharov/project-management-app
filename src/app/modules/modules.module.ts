import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EditUserComponent } from './user/components/edit-user/edit-user.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule, FormsModule, ReactiveFormsModule, TranslateModule],
})

export class ModulesModule { }
