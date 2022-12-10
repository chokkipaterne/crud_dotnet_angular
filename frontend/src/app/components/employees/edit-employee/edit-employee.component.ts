import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (employee) => {
              console.log(employee);
              this.editEmployeeRequest = employee;
            },
            error: (response) => {
              console.log(response);
            },
          });
        }
        console.log(id);
      },
    });
  }
  updateEmployee() {
    this.employeeService
      .updateEmployee(this.editEmployeeRequest.id, this.editEmployeeRequest)
      .subscribe({
        next: (employee) => {
          console.log(employee);
          this.router.navigate(['employees']);
        },
        error: (response) => {
          console.log(response);
        },
      });
  }
  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (employee) => {
        console.log(employee);
        this.router.navigate(['employees']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
