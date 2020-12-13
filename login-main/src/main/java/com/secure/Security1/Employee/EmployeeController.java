package com.secure.Security1.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.secure.Security1.respositories.UserRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;

	@RequestMapping("/employee")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Iterable<Employee> getAllEmployee()  {
			return  employeeService.findAll();
		
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/employee")
	@PreAuthorize("hasAuthority('ADMIN')")
	public void addTopic(@RequestBody Employee employee) {
		employeeService.save(employee);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/employee/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public void updateTopic(@RequestBody Employee employee, @PathVariable int id) {
		employeeService.update(employee, id);
	}
	

	@RequestMapping(method=RequestMethod.DELETE, value="/employee/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteEmployee(@PathVariable int id) {
		employeeService.delete(id);
	}
	
	@RequestMapping("/employee/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Employee findEmployee(@PathVariable int id) {
		return employeeService.find(id);
	}
	
	
}
