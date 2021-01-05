package com.secure.Security1.forgotpass;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.secure.Security1.model.User;
import com.secure.Security1.respositories.UserRepository;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public void updateResetPasswordToken(String token, String email) throws UserNotFoundException{
		User user = userRepository.findByEmail(email);
		
		if(user != null) {
			user.setResetPasswordToken(token);
			user.setExpiryDate(LocalDateTime.now().plusMinutes(30));
			userRepository.save(user);
		}
		else {
			throw new UserNotFoundException("Could not find any user with email"+email);
		}
	}
	
	public User getByResetPasswordToken(String token) {
		return userRepository.findByResetPasswordToken(token);
	}
	
	public void updatePassword(User user, String newPassword) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedPassword = encoder.encode(newPassword);
		
		user.setPassword(encodedPassword);
		user.setResetPasswordToken(null);
		
		userRepository.save(user);
	}
	
	public User getByUsername(String username) {
		return userRepository.findByusername(username);
	}
	
	public void changePassword(User user, String newPassword) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedPassword = encoder.encode(newPassword);
		
		user.setPassword(encodedPassword);
		
		userRepository.save(user);
	}
}
