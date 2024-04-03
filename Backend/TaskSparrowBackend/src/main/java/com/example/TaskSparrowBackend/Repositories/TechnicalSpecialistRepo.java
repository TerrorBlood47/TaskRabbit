package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.RegisteredUser;
import com.example.TaskSparrowBackend.Models.TechnicalSpecialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface TechnicalSpecialistRepo extends JpaRepository< TechnicalSpecialist, UUID > {
	
	@Query("SELECT COUNT(ts) FROM TechnicalSpecialist ts WHERE email = ?1")
	int countByEmail( String email );
	
	@Query("SELECT COUNT(ts) FROM TechnicalSpecialist ts WHERE userName = ?1")
	int countByUserName( String userName );
	
	@Query("SELECT ts FROM TechnicalSpecialist ts WHERE email = ?1")
	TechnicalSpecialist getTechSpecByEmail( String email );
	
	@Query("SELECT ts FROM TechnicalSpecialist ts WHERE userName = ?1")
	TechnicalSpecialist getTechSpecByUserName( String userName );
}
