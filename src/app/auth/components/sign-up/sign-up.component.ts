import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthApiService } from 'src/app/core/services/api/auth-api.service';
import {
  confirmPasswordValidator,
  passwordValidator,
} from 'src/app/core/validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm = this.fb.group(
    {
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validator: confirmPasswordValidator('password', 'confirmPassword') },
  );

  isHidden = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthApiService,
  ) {}

  onSubmit() {
    const { name, login, password } = this.signUpForm.value;
    if (name && login && password) {
      this.authService.signUp({ name, login, password }).pipe(take(1)).subscribe();
    }
  }
}
