import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { AddTokenInterceptor } from './interceptors/add-token';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, FooterComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
})
export class CoreModule {}
