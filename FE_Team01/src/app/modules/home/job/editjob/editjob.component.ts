import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { AdminControllerService } from '../../../../@core/services/adminController.service';
import { ServicesService } from '../../../../jobservice/services.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DataService } from '../../../../@core/services/data.service';
import { Validator } from '../../../../@core/services/validators';

export interface Skill {
  name: string;
}
@Component({
  selector: 'ngx-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.scss']
})
export class EditjobComponent implements OnInit {

  formAdd: FormGroup;
  public messages = '';
  jobPositions: any;
  jobPosition: any;
  workingForms: any;
  workingForm: any;
  academicLevels: any;
  academicLevel: any;
  ranks: any;
  rank: any;
  statusJobs: any;
  statusJob: any;
  users: any
  user: any;
  obj = { "pageNumber": 0, "pageSize": 100 };
  job: any
  constructor(
    private admicontrolService: AdminControllerService,
    private fb: FormBuilder,
    private router: Router,
    private jobservice: ServicesService, private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getJobPosition();
    this.loadUser();
    this.initForm();
    this.job = this.dataService.getJob();

  }

  initForm() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      jobPosition: ['', Validators.required],
      numberExperience: ['', [Validators.required, Validator.cannotLessorEqualzero]],
      workingForm: ['', [Validators.required]],
      addressWork: ['', Validators.required],
      academicLevel: ['', Validators.required],
      qtyPerson: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      rank: ['', Validators.required],
      dueDate: ['', Validators.required],
      skills: ['', [Validators.required, Validator.LessThanToday]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      benefits: ['', [Validators.required, Validators.maxLength(2000)]],
      jobRequirement: ['', [Validators.required, Validators.maxLength(2000)]],
      salaryMax: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[0-9]{5,20}$')]],
      salaryMin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[0-9]{5,20}$')]],
      contact: ['', Validators.required],
      statusJob: ['', Validators.required],
      views: [''],
      startRecruitmentDate: ['']

    });
  }
  get f() {
    return this.formAdd.controls;
  }

  addJobConfirm(event: Event) {
    event.preventDefault();
    if (this.formAdd.valid) {
      const date = new Date()
      this.formAdd.patchValue({ views: 0, startRecruitmentDate: date });
      console.log(this.formAdd.value);
      this.jobservice.createNewJob(this.formAdd.value).subscribe(
        Response => {
          if (Response.httpStatus === "OK") {
            alert('Tạo mới thành công!');

            this.router.navigate(['/home/userlists']);
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

  cancelAction(event: Event) {
    event.preventDefault();
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  loadUser() {
    this.admicontrolService.getListJE(this.obj).subscribe(
      Response => {
        this.users = Response;

      }, error => {
        console.log(error);
      }
    );
  }
  getJobPosition() {
    this.jobservice.getAllJobPosition().subscribe(data => {
      this.jobPositions = data;
      console.log(this.jobPositions);
    });
    this.jobservice.getAllWorkingForm().subscribe(data => {
      this.workingForms = data;
    });


    this.jobservice.getAllAcademiclevel().subscribe(data => {
      this.academicLevels = data;

    });

    this.jobservice.getAllRank().subscribe(data => {
      this.ranks = data;
    });



    this.jobservice.getAllStatusJob().subscribe(data => {
      this.statusJobs = data;
    });
  }
}
