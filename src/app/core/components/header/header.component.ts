import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { logoutUser } from 'src/app/store/actions/auth.actions';
import { LocalDataService } from 'src/app/core/services/localStorage/local-data.service';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';

const enum Langs {
  EN = 'en',
  RU = 'ru',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected token$!: Observable<string>;

  private tokenSub!: Subscription;

  private defaultLang = Langs.EN;

  public isDefaultLang = true;

  public isAuthorized: boolean = false;

  constructor(
    public translate: TranslateService,
    private localStorage: LocalDataService,
    private store: Store,
    private router: Router,
  ) {
    translate.addLangs([Langs.RU, Langs.EN]);
    translate.setDefaultLang(this.defaultLang);
    this.initLang();

    this.token$ = this.store.select(fromCurrentUser.selectToken);
  }

  ngOnInit(): void {
    this.tokenSub = this.token$.subscribe((token) => {
      this.isAuthorized = Boolean(token);
    });
  }

  toggleLang() {
    this.isDefaultLang = !this.isDefaultLang;
    if (this.isDefaultLang) {
      this.translate.use(Langs.EN);
      this.localStorage.appLang = Langs.EN;
    } else {
      this.translate.use(Langs.RU);
      this.localStorage.appLang = Langs.RU;
    }
  }

  public logout(): void {
    this.store.dispatch(logoutUser());
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }

  private initLang(): void {
    const selectedLang = this.localStorage.appLang;
    const isLangSelected = Boolean(selectedLang);
    if (isLangSelected) {
      this.isDefaultLang = selectedLang === this.defaultLang;
      this.translate.use(selectedLang);
    } else {
      this.isDefaultLang = true;
      this.translate.use(this.defaultLang);
    }
  }
}
