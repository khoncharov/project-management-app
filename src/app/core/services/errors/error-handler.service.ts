import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ErrType } from '../../../store/reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class ErrorDescriptionService {
  private txtCode!: string;

  private txtMessage!: string;

  constructor(private tr: TranslateService) {}

  get(err: ErrType): string {
    this.translate(err.code);

    return `${this.txtMessage} [${this.txtCode}: ${err.code}]`;
  }

  translate(code: number): void {
    this.tr.get(['error']).subscribe((translation) => {
      this.txtCode = translation.error.code;
      this.txtMessage = translation.error[`code${code}`];
    });
  }
}
