package com.secure.Security1.Employee;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;



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
	
	public String create(Employee employee) {
		Boolean check = employeeRepository.existsByUserNameIgnoreCase(employee.getUserName());
		if(!check) {
			employeeRepository.save(employee);
			return "Success";
		}else
		{
			return "Username Taken";
		}
	}
	@Override
	public String userExist(Employee employee) {
		Boolean check = employeeRepository.existsByUserNameIgnoreCase(employee.getUserName());
		if(!check) {
			return "Success";
		}else
		{
			return "Username Taken";
		}
	}
	
	@Override
	public String emailExist(Employee employee) {
		Boolean check = employeeRepository.existsByEmailIgnoreCase(employee.getEmail());
		if(!check) {
			return "Success";
		}else
		{
			return "Email Taken";
		}
	}
	@Override
	public String IdExist(Employee employee) {
		Boolean check = employeeRepository.existsByEmployeeIdIgnoreCase(employee.getEmployeeId());
		if(!check) {
			return "Success";
		}else
		{
			return "ID already exist in the database";
		}
	}
	
	@Override
	public void delete(int id) {
		employeeRepository.deleteById(id);
	}
	@Override
	public Employee update(Employee employee, int d) {
		return  employeeRepository.save(employee);
	}
	@Override
	public List<Employee> findByName(String Name) {
		return employeeRepository.findByName(Name);
	}
	@Override
	public List<Employee> findByUserName(String userName) {
		return employeeRepository.findByUserName(userName);
	}
	@Override
	public List<Employee> findBySoftDelete(int softdel) {
		return employeeRepository.findBySoftDelete(softdel);
	}
	@Override
	public List<Employee> findByActive(int active) {
		return employeeRepository.findByActive(active);
	}
	@Override
	public Employee store(MultipartFile file) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Employee Employee= new Employee(file.getBytes(),  fileName);
		return employeeRepository.save(Employee);
	}

}
