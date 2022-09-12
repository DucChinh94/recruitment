import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FILE } from 'dns';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { FileController } from '../../../@core/services/FilerController.service';
import { SessionService } from '../../../@core/services/session.service';
import { User } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  username: string;
  check: boolean;
  messages = '';
  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private uploadService: FileController, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getByUserName();
    this.initForm();
    this.getfilename();
  }

  getfilename() {
    this.uploadService.getfileName(localStorage.getItem('token').split(":")[1].split(',')[0].replace('"', '').replace('"', '')).subscribe(
      Response => {
        this.filename = Response.name;
        console.log(this.filename);
      }
    );
  }
  get f() {
    return this.formProfile.controls;
  }
  initForm() {
    this.formProfile = this.fb.group({
      name: ["", Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern('^[0-9]{10}')],
      birthDay: ['', Validators.required],
      homeTown: ['',],
      gender: ['', Validators.required]
    });
  }
  getByUserName() {
    const username = localStorage.getItem('token').split(":")[1].split(',')[0].replace('"', '').replace('"', '');
    this.profileService.getProfile(username).subscribe(
      Response => {
        this.updateForm(Response.obj.user);
      }
    )
  }

  updateForm(user: User): void {
    console.log(user.birthDay);
    const birthday = user.birthDay.split('-');
    console.log(birthday);
    const newbirthDay = birthday[2] + '-' + birthday[1] + '-' + birthday[0];
    this.formProfile.patchValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthDay: newbirthDay,
      homeTown: user.homeTown,
      gender: user.gender
    });
  }

  update() {
    const username = localStorage.getItem('token').split(":")[1].split(',')[0].replace('"', '').replace('"', '');
    if (this.formProfile.valid) {
      const birthday = this.formProfile.value.birthDay.split('-');
      const birthDaynew = birthday[2] + '-' + birthday[1] + '-' + birthday[0];
      this.formProfile.patchValue({ birthDay: birthDaynew });

      this.profileService.updateProfile(username, this.formProfile.value).subscribe(Response => {
        if (Response.httpStatus === "OK") {

          this._snackBar.open("Cập nhật thành công", "Đồng ý", {
            duration: 4000
          });
          this.messages = '';
          this.uploadFiles();
          this.ngOnInit();
          // this.router.navigate(['/home/userlists']);
        }
      }, error => {
        if (error.error.message === "Email đã tồn tại") {
          this.messages = "Email đã tồn tại";
          return;
        } else if (error.error.message === "Phone đã tồn tại") {
          this.messages = "Phone đã tồn tại";
          return;
        }
      }
      );

    }
  }

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  filename: any;


  selectFiles(event: any): void {
    this.check = true;
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      console.log(file);
      this.uploadService.upload(file, localStorage.getItem('token').split(":")[1].split(',')[0].replace('"', '').replace('"', '')).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
            this.check = false;
            this.ngOnInit();
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles('7e29889b87b94257a7a07368a9d25aca.png');

          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

}