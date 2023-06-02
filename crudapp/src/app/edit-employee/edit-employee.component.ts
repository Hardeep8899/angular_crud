import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    console.log("this.employeeId " + this.employeeId )
    console.log(this.route)
    this.getEmployeeDetailById();
  }
  getEmployeeDetailById() {
    this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body.msg;
        if (resultData) {
          this.editEmployeeForm.Id = resultData._id;
          this.editEmployeeForm.firstName = resultData.firstName;
          this.editEmployeeForm.lastName = resultData.lastName;
          this.editEmployeeForm.email = resultData.email;
          this.editEmployeeForm.address = resultData.address;
          this.editEmployeeForm.phone = resultData.phone;
        }
      }
    },
      (error: any) => { });
  }

  EditEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.updateEmployee(this.editEmployeeForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class employeeForm {
  Id: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
}