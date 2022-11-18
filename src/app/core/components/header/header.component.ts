import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLangChecked: boolean = JSON.parse(
    localStorage.getItem('LangChecked') || '{}',
  );

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  checkLang() {
    this.isLangChecked = !this.isLangChecked;

    if (this.isLangChecked) {
      this.translate.use('ru');
      localStorage.setItem('translate', 'ru');
    } else {
      this.translate.use('en');
      localStorage.setItem('translate', 'en');
    }
    localStorage.setItem('LangChecked', `${this.isLangChecked}`);
  }
}
