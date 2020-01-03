import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthApiService } from '../../services/auth-api.service';
import { AuthData } from '../../models/auth-data';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';
import { IJwtToken } from '../../interfaces/i-jwt-token';
import { HttpErrorResponse } from '@angular/common/http';

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
  public backendErrorResponse: string;

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.jwtService.destroyTokenData();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required])
    });
  }

  public submitForm(): void {
    this.submitClicked = true;
    if (this.form.valid) {
      this.submitting = true;
      this.backendErrorResponse = null;
      this.authApiService.login(this.form.value as AuthData).pipe(untilDestroyed(this)).subscribe(
        (data: IJwtToken) => {
        this.submitting = false;
        this.jwtService.setTokenData(data.token);
        this.router.navigate(['/']).then();
      }, (response: HttpErrorResponse) => {
        this.submitting = false;
        this.backendErrorResponse = response.error.message;
      });
    }
  }
}
