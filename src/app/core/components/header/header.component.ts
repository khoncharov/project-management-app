import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { logoutUser } from 'src/app/store/actions/auth.actions';
import { getUser } from 'src/app/store/actions/user.actions';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';
import { User } from 'src/app/core/models';
import { LocalDataService } from 'src/app/core/services/localStorage/local-data.service';

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

  protected user$!: Observable<User>;

  private currentUserSubscription!: Subscription;

  private currentTokenSubscription!: Subscription;

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
    this.user$ = this.store.select(fromCurrentUser.selectUser);
  }

  ngOnInit(): void {
    this.currentTokenSubscription = this.token$.subscribe((token) => {
      const isTokenExist = Boolean(token);
      if (isTokenExist) {
        this.router.navigate(['/projects']);
        this.isAuthorized = true;
      } else {
        this.router.navigate(['/home']);
        this.isAuthorized = false;
      }
    });

    this.currentUserSubscription = this.user$.subscribe((user) => {
      if (user && !user.name) {
        this.store.dispatch(getUser({ id: user.id }));
      }
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
  }

  ngOnDestroy(): void {
    this.currentTokenSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
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
