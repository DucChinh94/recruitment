import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { TokenService } from '../../@core/services/token.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;

  public messages = "";
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }

  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$')]]
    });
  }

  get f() {
    return this.formLogin.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          console.log(data);
          this.isLoggedIn = true;
          const decodeTokenStr = JSON.stringify(jwt_decode(data.jwt));
          localStorage.setItem('token', decodeTokenStr);

          this.tokenService.saveToken(data.jwt);
          this.tokenService.saveUser(data.user);
          if (localStorage.getItem('token') != null) {
            const tokenInfo = localStorage.getItem('token');
            const roleFromToken = tokenInfo.split(":")[2].split(",")[0].replace('"', '').replace('"', '');
            console.log(roleFromToken);
            if (roleFromToken === "ROLE_ADMIN" || roleFromToken === "ROLE_JE") {
              this.router.navigate(['/home/']);
            } else {
              this.router.navigate(['/public/jobpublic']);
            }
          }
        }, Response => {

          if (Response.error.message === "T??i kho???n kh??ng t???n t???i") {
            this.messages = "T??i kho???n kh??ng t???n t???i";

          } else if (Response.error.message === "Sai th??ng tin m???t kh???u") {
            this.messages = "Sai th??ng tin m???t kh???u";
          } else if (Response.error.message === "T??i kho???n ch??a active") {
            alert("T??i kho???n ch??a ???????c active");
          }
        });
      ;
    }
  }

}
