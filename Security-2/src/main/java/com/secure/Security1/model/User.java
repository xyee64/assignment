package com.secure.Security1.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.secure.Security1.Employee.Employee;

@Entity
@Table(name="users")
public class User {

	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String username;
	private String password;
	
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name="users_roles",
				joinColumns = @JoinColumn(name="user_id"),
				inverseJoinColumns = @JoinColumn(name="role_id"))
	private Set<Role> roles = new HashSet<>();
	
	@OneToMany(targetEntity=Employee.class, cascade=CascadeType.ALL)
	@JoinColumn(name="ue_fk", referencedColumnName="user_id")
	private List<Employee> employee;
		
	public List<Employee> getEmployee() {
		return employee;
	}

	public void setEmployee(List<Employee> employee) {
		this.employee = employee;
	}

	public User(List<Employee> employee) {
		this.employee = employee;
	}

	public User() {
	}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
		
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}	


	
	
	
}
