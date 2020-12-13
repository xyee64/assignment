package com.secure.Security1.Employee;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("employeeRepository")
public interface EmployeeRepository extends CrudRepository <Employee, Integer> {

}
