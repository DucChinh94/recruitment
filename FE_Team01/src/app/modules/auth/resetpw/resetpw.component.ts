import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.scss']
})
export class ResetpwComponent implements OnInit {
  formReset: FormGroup;
  public messages = '';
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formReset = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      repassword: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }
  get f() {
    return this.formReset.controls;
  }
  reset() {
    if (this.formReset.valid) {
      this.authService.resetpw(this.formReset.value).subscribe(

        Response => {
          if (Response === "OK") {
            alert("Đặt lại mật khẩu thành công!");
            this.router.navigate(['/auth']);
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
  // isEmail(search: string) : boolean{
  //   var serchfind:boolean;
  //   regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  //   serchfind = regexp.test(search);
  //   return serchfind;

  // }


}
