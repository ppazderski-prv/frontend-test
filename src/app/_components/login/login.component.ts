import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitClicked = false;
  public submitting = false;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
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
    this.submitting = true;
    console.log(this.form);
    console.log(this.form.value);
  }
}
