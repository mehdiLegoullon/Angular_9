import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {take, tap} from 'rxjs/operators';
import {SnackBarService} from '../../../services/snack-bar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
    );
  }

  sendLoginForm() {
    const values = this.loginForm.value;
    return this.authService.loginWithEmailAndPassword$(values.email, values.password)
      .pipe(
        take(1),
        tap(() => {
          this.snackBarService.validLoginUser();
          this.loginForm.reset();
        }),
      )
      .subscribe();
  }

}
