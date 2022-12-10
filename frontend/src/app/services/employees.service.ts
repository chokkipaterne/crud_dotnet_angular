import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
  //Get all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees');
  }
  //Save a new employee
  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(
      this.baseApiUrl + '/api/employees',
      addEmployeeRequest
    );
  }
  //get employee details based on id
  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }
  //update employee information based on id and new employee details
  updateEmployee(
    id: string,
    updateEmployeeRequest: Employee
  ): Observable<Employee> {
    return this.http.put<Employee>(
      this.baseApiUrl + '/api/employees/' + id,
      updateEmployeeRequest
    );
  }
  //delete employee based on id
  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }
}
