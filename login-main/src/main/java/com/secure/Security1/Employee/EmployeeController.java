package com.secure.Security1.Employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.secure.Security1.model.User;
import com.secure.Security1.response.MessageResponse;
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
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public void addTopic(@RequestBody Employee employee) {
		employeeService.save(employee);
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/employee/save")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public String newUser(@RequestBody Employee employee) {
		return employeeService.create(employee);
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/employee/check-user")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public String checkUser(@RequestBody Employee employee) {
		return employeeService.userExist(employee);
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/employee/check-email")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public String checkEmail(@RequestBody Employee employee) {
		return employeeService.emailExist(employee);
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/employee/check-id")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public String checkId(@RequestBody Employee employee) {
		return employeeService.IdExist(employee);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/update/{id}")
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
	
	@GetMapping("/findname/{name}")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public List<Employee> findbyNameEmployee(@PathVariable String name) {
		return employeeService.findByName(name);
	}
	
	@GetMapping("/softdelete/{softdel}")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public List<Employee> findbySoftDelete(@PathVariable int softdel) {
		return employeeService.findBySoftDelete(softdel);
	}
	@GetMapping("/active/{active}")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public List<Employee> findbyActive(@PathVariable int active) {
		return employeeService.findByActive(active);
	}
	
	@GetMapping("/finduser/{name}")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public List<Employee> findbyUserNameEmployee(@PathVariable String name) {
		return employeeService.findByUserName(name);
	}
	
	@PostMapping("/employee/upload")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file){
		String message="";
		try {
			employeeService.store(file);
			
			message="Uploaded file successfully:" + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));		
		}
		catch(Exception e) {
			message = "Could not upload the file:" + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));		
		}
	}


}
