import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthApiService } from 'src/app/core/services/api/auth-api.service';
import { passwordValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    login: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(),
      ],
    ],
  });

  isHidden = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthApiService,
  ) {}

  onSubmit() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      this.authService
        .signIn({ login, password })
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigateByUrl('projects');
        });
    }
  }
}
