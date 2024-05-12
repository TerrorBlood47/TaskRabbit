package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.Task;
import com.example.TaskSparrowBackend.Models.Tasker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository< Task, Integer> {
	
	@Query("SELECT t FROM Task t WHERE t.taskerId = ?1")
	List< Task> findByTaskerId( Integer taskerId );
	
	@Query("SELECT t FROM Task t WHERE t.userId = ?1")
	List< Task> findByUserId( Integer userId );
	
	@Query("SELECT t FROM Task t WHERE t.status = 'PENDING' AND t.taskerId = ?1")
	List< Task> findPendingTasksByTaskerId( Integer taskerId );
	
	@Query("SELECT t FROM Task t WHERE t.status = 'ACCEPTED' AND t.taskerId = ?1")
	public List< Task> findAcceptedTasksByTaskerId( Integer taskerId );
	
	@Query("SELECT t FROM Task t WHERE t.status = 'PENDING' AND t.userId = ?1")
	public List< Task>  findPendingTasksByUserId( Integer userId );
	
	@Query("SELECT t FROM Task t WHERE t.status = 'ACCEPTED' AND t.userId = ?1")
	public List< Task> findAcceptedTasksByUserId( Integer userId );
}
