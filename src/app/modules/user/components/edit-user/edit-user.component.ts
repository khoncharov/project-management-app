import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public login = '';

  public editForm!: FormGroup;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }
}
