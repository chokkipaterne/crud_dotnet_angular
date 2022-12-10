using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers;

//just to say to the system that we won't have any views
//just only api
//[controller] the name of the controller will be replaced there
//[controller]==employees
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : Controller
{
    private readonly TutoDbContext _tutoDbContext;
    public EmployeesController(TutoDbContext tutoDbContext)
    {
        _tutoDbContext = tutoDbContext;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllEmployees() 
    {
        var employees = await _tutoDbContext.Employees.ToListAsync();
        return Ok(employees);
    }

    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest) 
    {
        employeeRequest.Id = Guid.NewGuid();
        await _tutoDbContext.Employees.AddAsync(employeeRequest);
        await _tutoDbContext.SaveChangesAsync();
        return Ok(employeeRequest);
    }

    
    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetEmployee([FromRoute] Guid id) 
    {
        var employee = await _tutoDbContext.Employees.FirstOrDefaultAsync(x => x.Id ==id);
        if (employee == null){
            return NotFound();
        }
        return Ok(employee);
    }

    
    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee UpdateEmployeeRequest) 
    {
        var employee = await _tutoDbContext.Employees.FindAsync(id);
        if (employee == null){
            return NotFound();
        }
        employee.Name = UpdateEmployeeRequest.Name;
        employee.Email = UpdateEmployeeRequest.Email;
        employee.Salary = UpdateEmployeeRequest.Salary;
        employee.Phone = UpdateEmployeeRequest.Phone;
        employee.Department = UpdateEmployeeRequest.Department;

        await _tutoDbContext.SaveChangesAsync();

        return Ok(employee);
    }

    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id) 
    {
        var employee = await _tutoDbContext.Employees.FindAsync(id);
        if (employee == null){
            return NotFound();
        }
        _tutoDbContext.Employees.Remove(employee);
        await _tutoDbContext.SaveChangesAsync();

        return Ok(employee);
    }


}
