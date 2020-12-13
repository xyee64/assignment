package com.secure.Security1.Employee;

import java.sql.Blob;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.secure.Security1.model.User;

@Entity
@Table(name="Employee")

public class Employee {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String EmployeeId;
	private String Department;
	private String DateJoined;
	private String Email;
	private String Address;
//	@Lob
//	private Blob content;
	private String Name;
	private String DOB;
	private String Position;
	private String Superior;
	private int experienceYears;
	private String contactNumber;
	private String officeLocation;
	
//	@ManyToOne
//	@JoinColumn(name="user_id")
//	private User user;
	
	public int getId() {
		return id;
	}
	public void setId(int Id) {
		id = Id;
	}
	public String getEmployeeId() {
		return EmployeeId;
	}
	public void setEmployeeId(String employeeId) {
		EmployeeId = employeeId;
	}
	public String getDepartment() {
		return Department;
	}
	public void setDepartment(String department) {
		Department = department;
	}
	public String getDateJoined() {
		return DateJoined;
	}
	public void setDateJoined(String dateJoined) {
		DateJoined = dateJoined;
	}
	public String geteMail() {
		return Email;
	}
	public void seteMail(String eMail) {
		this.Email = eMail;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	
//	public Blob getPhoto() {
//		return Photo;
//	}
//	public void setPhoto(Blob photo) {
//		Photo = photo;
//	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getDOB() {
		return DOB;
	}
	public void setDOB(String dOB) {
		DOB = dOB;
	}
	public String getPosition() {
		return Position;
	}
	public void setPosition(String position) {
		Position = position;
	}
	public String getSuperior() {
		return Superior;
	}
	public void setSuperior(String superior) {
		Superior = superior;
	}
	public int getExperienceYears() {
		return experienceYears;
	}
	public void setExperienceYears(int experienceYears) {
		this.experienceYears = experienceYears;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getOfficeLocation() {
		return officeLocation;
	}
	public void setOfficeLocation(String officeLocation) {
		this.officeLocation = officeLocation;
	}

	

	
	
	
	
}