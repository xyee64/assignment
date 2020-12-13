package com.secure.Security1.Employee;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service("employeeService")
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Override
	public Iterable<Employee> findAll(){
		return employeeRepository.findAll();
	}
	@Override
	public Employee find(int id) {
		return employeeRepository.findById(id).get();
	}
	@Override
	public Employee save(Employee employee) {
		return employeeRepository.save(employee);
	}
	@Override
	public void delete(int id) {
		employeeRepository.deleteById(id);
	}
	
	public Employee update(Employee employee, int d) {
		return  employeeRepository.save(employee);
	}
	
}
