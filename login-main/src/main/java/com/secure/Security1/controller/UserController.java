package com.secure.Security1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secure.Security1.forgotpass.UserService;
import com.secure.Security1.model.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping("/user")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public Iterable<User> getAllUser()  {
			return  userService.findAll();
		
	}
	
	@RequestMapping("/user/{id}")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public User findUser(@PathVariable Integer id) {
		return userService.find(id);
	}
}
