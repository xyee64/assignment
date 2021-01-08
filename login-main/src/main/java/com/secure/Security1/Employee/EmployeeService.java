package com.secure.Security1.Employee;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface EmployeeService {
	public Iterable<Employee> findAll();
//	public List<Product> search(double min, double max);
	public Employee find(int Id);
	public Employee save(Employee employee);
	public Employee update(Employee employee, int Id);
	public void delete(int Id);
	public List<Employee> findByName(String Name);
	public List<Employee> findByUserName(String userName);
	public String create(Employee employee);
	public String userExist(Employee employee);
	public String emailExist(Employee employee);
	public String IdExist(Employee employee);
	List<Employee> findBySoftDelete(int softdel);
	List<Employee> findByActive(int active);
}

