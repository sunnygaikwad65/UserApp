import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { UserService } from '../user.service';
import { MustMatch } from './must-match.validator';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  isEdit: boolean = false;
  editData: any;
  userForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    address: ['', [Validators.required]],
    mobileNumber: ['', [Validators.required]],
    email_address: ['', [Validators.required, Validators.email]],
    companies: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private userService: UserService) {
    if (data) {
      this.isEdit = true;
      this.editData = data;
    }
  }
  get f() { return this.userForm.controls; }

  ngOnInit() {
    console.log("ngoninit")
    const password = this.userForm.get('password');
    const confirmPassword = this.userForm.get('confirmPassword');
    password.setValidators(null);
    password.updateValueAndValidity();
    confirmPassword.setValidators(null);
    confirmPassword.updateValueAndValidity();
    this.userForm.setValue(this.editData);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(res => {
        const result: any = res;
        if (result.success) {
          this.dialogRef.close();
        }
      })
    }

  }



}
