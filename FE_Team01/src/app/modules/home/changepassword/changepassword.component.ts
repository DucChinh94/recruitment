import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  formReset: FormGroup;
  public messages = '';
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formReset = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      repassword: ['', Validators.required],
      currentpassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
    });
  }
  get f() {
    return this.formReset.controls;
  }
  reset() {
    if (this.formReset.valid) {
      this.authService.changepasswword(this.formReset.value).subscribe(

        Response => {
          if (Response.message === "Đổi mật khẩu thành công") {
            this.snackbar.open('Đổi mật khẩu thành công', 'Đóng', {
              duration: 3000
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/auth']);
            });
            // alert("Đặt lại mật khẩu thành công!");

          } else if (Response.message === "Mật khẩu không khớp") {
            this.messages = "Mật khẩu hiện tại không khớp";
          }
        },
        error => {
          if (error.error.message === "Otp không đúng!") {
            this.messages = 'Otp không đúng!';
          } else if (error.error.message === "Otp này đã hết hạn!") {
            this.messages = "Otp này đã hết hạn!"
          }
        });
    }
  }



}