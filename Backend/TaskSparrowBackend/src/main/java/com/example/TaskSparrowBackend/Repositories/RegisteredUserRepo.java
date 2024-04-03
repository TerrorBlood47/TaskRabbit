package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RegisteredUserRepo extends JpaRepository< RegisteredUser, UUID > {
	
	@Query("SELECT COUNT(ru) FROM RegisteredUser ru WHERE email = ?1")
	int countByEmail( String email );
	
	@Query("SELECT COUNT(ru) FROM RegisteredUser ru WHERE userName = ?1")
	int countByUserName( String userName );
	
	@Query("SELECT ru FROM RegisteredUser ru WHERE email = ?1")
	RegisteredUser getUserByEmail( String email );
	
	@Query("SELECT ru FROM RegisteredUser ru WHERE userName = ?1")
	RegisteredUser getUserByUserName( String userName );
}
