package com.secure.Security1.controller;

import java.util.*;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.secure.Security1.Employee.Employee;
import com.secure.Security1.Employee.EmployeeService;
import com.secure.Security1.model.*;
import com.secure.Security1.request.*;
import com.secure.Security1.response.*;
import com.secure.Security1.respositories.*;
import com.secure.Security1.service.*;
import com.secure.Security1.utils.JwtUtils;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/auth", method=RequestMethod.POST)
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	
	@PostMapping("/signin")
	public ResponseEntity<?> createAuthenticationToken (@RequestBody LoginRequest loginRequest) throws Exception{
		try {
			authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
			}
		catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		MyUserDetails test = (MyUserDetails) authentication.getPrincipal();
		List<String> roles = test.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(loginRequest.getUsername());
		final String jwt = jwtUtils.generateToken(userDetails);;
		
		return ResponseEntity.ok(new jwtResponse(jwt,test.getId(),test.getUsername(),roles));
	}
	
	@PostMapping("/register")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		User user = new User(signUpRequest.getUsername(), 
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getEmail());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} 
		else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
					
//				default:
//					Role userRole = roleRepository.findByName(ERole.USER)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					roles.add(userRole);

				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

}
