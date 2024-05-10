package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository< Profile, Integer> {
	
	@Query("SELECT p FROM Profile p WHERE p.userId = ?1")
	public Optional<Profile> findByUserId(  Integer userId );
}
