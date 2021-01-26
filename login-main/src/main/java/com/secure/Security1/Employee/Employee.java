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
	private String employeeId;
	private String Department;
	private String DateJoined;
	private String email;
	private String Address;
	private int softDelete;
	private int active;
	private String createdBy;
	private String edittedBy;
	private String name;
	private String DOB;
	private String Position;
	private String Superior;
	private int experienceYears;
	private String contactNumber;
	private String officeLocation;
	private String userName;
	private String photo;
	private String attachment;
	
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
		return employeeId;
	}
	public void setEmployeeId(String EmployeeId) {
		employeeId = EmployeeId;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String Email) {
		this.email = Email;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getName() {
		return name;
	}
	public void setName(String Name) {
		name = Name;
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
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getActive() {
		return active;
	}
	public void setActive(int active) {
		this.active = active;
	}
	public int getSoftDelete() {
		return softDelete;
	}
	public void setSoftDelete(int softDelete) {
		this.softDelete = softDelete;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getEdittedBy() {
		return edittedBy;
	}
	public void setEdittedBy(String edittedBy) {
		this.edittedBy = edittedBy;
	}
}