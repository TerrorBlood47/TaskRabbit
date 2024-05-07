package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository< User, Integer> {
	
	public User findByEmail(String email);
	
	@Query("select u from User u where u.name Like %:query% or u.email Like %:query%")
	public List<User> searchUser( @Param("query") String query);
	
	@Query("select u from User u where u.email = :email and u.password = :password")
	public User findByEmailAndPassword(@Param("email") String email,@Param("password") String password);
	
	
}
