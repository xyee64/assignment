package com.secure.Security1.Employee;



public interface EmployeeService {
	public Iterable<Employee> findAll();
//	public List<Product> search(double min, double max);
	public Employee find(int Id);
	public Employee save(Employee employee);
	public Employee update(Employee employee, int Id);
	public void delete(int Id);
}

