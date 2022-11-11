import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
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
      [Validators.required, Validators.minLength(8), passwordValidator()],
    ],
  });

  isHidden = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthApiService,
  ) {}

  getErrorMessage(error: ValidationErrors) {
    if (error['required']) return 'Please fill in this field';
    if (error['minlength']) return 'Should be at least 8 characters';
    if (error['inValidPassword']) {
      return 'Should contain at least 1 capital letter, 1 small letter and 1 number';
    }
    return '';
  }

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
