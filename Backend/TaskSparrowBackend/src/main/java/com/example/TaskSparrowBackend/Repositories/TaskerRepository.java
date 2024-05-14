package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.Tasker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskerRepository extends JpaRepository< Tasker, Integer> {
	
	@Query("SELECT t FROM Tasker t WHERE t.role = ?1")
	public List<Tasker> findByRole( String role );
	
	@Query("SELECT t FROM Tasker t WHERE t.area = ?1")
	public List< Tasker> findByArea( String area );
	
	@Query("SELECT t FROM Tasker t WHERE t.minWagePerHour = ?1")
	public List< Tasker> findByMinWagePerHour( Integer minWagePerHour );
	
	@Query("SELECT t FROM Tasker t WHERE t.userId = ?1")
	public Tasker findByUserId( Integer userId );
	
	@Query("SELECT t FROM Tasker t WHERE t.role = ?1 AND t.area = ?2")
	public List< Tasker> findByRoleAndArea( String role, String area );
}
