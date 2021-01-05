package com.secure.Security1.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.secure.Security1.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	Optional<User> findByUsername(String username);
	Boolean existsByUsername(String username);
	
	public User findByResetPasswordToken(String token);
	public User findByEmail(String email);
	public User findByusername(String username);
}
