import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ok } from 'assert';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../@core/services/auth.service';


@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;
  isSubmitted = false;
  isSaving = false;
  public messages = '';
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.formSignup = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      fullName: "xuan",
      name: "pahm"
      // userName: "xuan",
      // password: "123456",
      // email: "hoang",
      // newPassword: "123456",
      // birthDay: "2020-07-12",
      // phoneNumber: "12354543",
      // fullName: "xuan",
      // name: "pahm"
    });
  }

  get f() {
    return this.formSignup.controls;
  }

  signup() {

    this.isSubmitted = true;
    if (this.formSignup.valid) {
      this.authService.signup(this.formSignup.value).subscribe(

        Response => {
          if (Response.httpStatus === "OK") {
            alert("Đăng kí tài khoản thành công!");
            localStorage.setItem("activeID", Response.obj.id);
            this.router.navigate(['/auth']);
          }
        }, error => {
          if (error.error.message === "Username đã tồn tại") {
            this.messages = "Username đã tồn tại";
          } else if (error.error.message === "Email đã tồn tại") {
            this.messages = "Email đã tồn tại";
          } else if (error.error.message === "Phone đã tồn tại") {
            this.messages = "Phone đã tồn tại";
          }
        });
    }
  }
  birthday: any;
  checkkk: boolean;
  getbirthday(event: any) {
    this.birthday = event.target.value;
    this.checkkk = this.check();
    console.log(this.checkkk);
  }

  check(): boolean {
    if (Date.parse(this.birthday) < new Date().getTime()) {
      return true;
    }
    else {
      return false;
    }

  }
}
