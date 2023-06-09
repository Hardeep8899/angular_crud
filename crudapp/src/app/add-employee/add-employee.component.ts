import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();

  

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;

  genderArray = [{name:"Male",aa:"male"},{name:"Female",aa:"female"}];
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {  console.log(this.addEmployeeForm);}
  ngAfterViewInit() {
    console.log('afeter')
    console.log(this.employeeForm)
    //this.employeeForm.nativeElement.value = 'Whale!';
  }
  AddEmployee(isValid: any) {
    console.log(isValid);
    console.log(this.addEmployeeForm)
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveEmployee(this.addEmployeeForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
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
  hello(a :any){
    console.log("a")
    console.log(this.addEmployeeForm.gender)
  }
}

export class employeeForm {
  firstName: string = "asd";
  lastName: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  gender: string = "";
}