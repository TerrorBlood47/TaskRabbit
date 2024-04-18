package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.Dispatcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DispatcherRepo extends JpaRepository< Dispatcher, UUID > {
	
	@Query("SELECT COUNT(d) FROM Dispatcher d WHERE email = ?1")
	int countByEmail( String email );
	
	@Query("SELECT COUNT(d) FROM Dispatcher d WHERE userName = ?1")
	int countByUserName( String userName );
	
	@Query("SELECT d FROM Dispatcher d WHERE email = ?1")
	Dispatcher getByEmail( String email );
	
	@Query("SELECT d FROM Dispatcher d WHERE userName = ?1")
	Dispatcher getByUserName( String userName );
	
	
}
