import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormControl } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-sendotp',
  templateUrl: './sendotp.component.html',
  styleUrls: ['./sendotp.component.scss']
})
export class SendotpComponent implements OnInit {
  formSendotp: FormGroup;
  isSubmitted = false;
  public messages = "";
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formSendotp = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  send() {
    this.isSubmitted = true;
    if (this.formSendotp.valid) {
      this.authService.sendotp(this.formSendotp.value).subscribe(
        Response => {
          if (Response.httpStatus === "OK") {
            alert("GỬi mã OTP thành công!");
            this.router.navigate(['/resetpw']);
          }
        },
        error => {
          if (error.error.message === "Email không tồn tại") {
            console.log(error.error.message);
            this.messages = "Email không tồn tại";
          }
        });
    }
  }
  onSubmit() {
    // console.log(this.formSendotp.value);
  }

  get f() {
    return this.formSendotp.controls

  }
}
