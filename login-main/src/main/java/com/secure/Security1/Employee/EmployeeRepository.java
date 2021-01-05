package com.secure.Security1.Employee;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.secure.Security1.model.User;


@Repository("employeeRepository")
public interface EmployeeRepository extends CrudRepository <Employee, Integer> {
	List<Employee> findByName(String Name);
	List<Employee> findByUserName(String userName);
	List<Employee> findBySoftDelete(int soft);
	List<Employee> findByActive(int active);
	Boolean existsByUserNameIgnoreCase(String username);
	Boolean existsByEmailIgnoreCase(String email);
	Boolean existsByEmployeeIdIgnoreCase(String employeeId);
	
}
