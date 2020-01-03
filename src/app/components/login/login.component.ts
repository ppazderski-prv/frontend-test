import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthApiService } from '../../services/auth-api.service';
import { AuthData } from '../../models/auth-data';
import { JwtService } from '../../services/jwt.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitClicked = false;
  public submitting = false;
  public backendErrorResponse = false;

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private jwtService: JwtService
  ) {
  }

  ngOnInit() {
    this.jwtService.destroyTokenData();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required])
    });
  }

  public submitForm(): void {
    this.submitClicked = true;
    if (this.form.valid) {
      this.submitting = true;
      this.backendErrorResponse = false;
      this.authApiService.login(this.form.value as AuthData).pipe(untilDestroyed(this)).subscribe((data) => {
        this.submitting = false;
        this.jwtService.setTokenData(data.token);
      }, () => {
        this.submitting = false;
        this.backendErrorResponse = true;
      });
    }
  }
}
