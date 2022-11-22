import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { logoutUser } from 'src/app/store/actions/auth.actions';
import { getUser } from 'src/app/store/actions/user.actions';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';
import { User } from '../../models';

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

  isLangChecked: boolean = JSON.parse(
    localStorage.getItem('LangChecked') || '{}',
  );

  public isAuthorized: boolean = false;

  constructor(
    public translate: TranslateService,
    private store: Store,
    private router: Router,
  ) {
    translate.setDefaultLang('en');

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

  public logout(): void {
    this.store.dispatch(logoutUser());
  }

  ngOnDestroy(): void {
    this.currentTokenSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }
}
