package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.Resolver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ResolverRepo extends JpaRepository< Resolver, UUID > {
	
	@Query("SELECT COUNT(r) FROM Resolver r WHERE email = ?1")
	int countByEmail( String email );
	
	@Query("SELECT COUNT(r) FROM Resolver r WHERE userName = ?1")
	int countByUserName( String userName );
	
	@Query("SELECT r FROM Resolver r WHERE email = ?1")
	Resolver getByEmail( String email );
	
	@Query("SELECT r FROM Resolver r WHERE userName = ?1")
	Resolver getByUserName( String userName );
}
