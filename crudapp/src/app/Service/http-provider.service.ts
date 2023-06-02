import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8000";

var httpLink = {
  getAllEmployee: apiUrl + "/api",
  deleteEmployeeById: apiUrl + "/api/delete-employee",
  getEmployeeDetailById: apiUrl + "/api/read-employee",
  saveEmployee: apiUrl + "/api/add-employee",
  updateEmployee : apiUrl + '/api/update-employee'
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployee);
  }
  public deleteEmployeeById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteEmployeeById + '/' + model);
  }
  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeDetailById + '/' + model);
  }
  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  } 
  public updateEmployee(model: any): Observable<any> {
    console.log("model")
    console.log(model)
    return this.webApiService.put(httpLink.updateEmployee + '/' + model.Id, model);
  }  
}                          