using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class TutoDbContext : DbContext
    {
        public TutoDbContext(DbContextOptions<TutoDbContext> options)
        : base(options) {
        }
        //Allow to establish the connection with the table employees and create table employees
        public DbSet<Employee> Employees {get; set;}
    }

    
}