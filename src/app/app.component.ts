import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog, private userService: UserService) {
    this.loadUser()
  }
  title = 'UserApp';
  displayedColumns: string[] = ['username', 'address', 'mobileNumber', 'email_address', 'companies', 'action'];
  dataSource = new MatTableDataSource([]);

  openDialog() {
    this.dialog.open(AddEditUserComponent, {

    });
  }

  editUser(element) {
    this.dialog.open(AddEditUserComponent, {
      data: element
    });
  }
  deleteUser(element) {
    this.dialog.open(DeleteUserComponent, {
      data: element
    });
  }
  loadUser() {
    this.userService.getAll().subscribe(res => {
      let data: any = res;
      this.dataSource = new MatTableDataSource(data.data);
    });
  }
}

