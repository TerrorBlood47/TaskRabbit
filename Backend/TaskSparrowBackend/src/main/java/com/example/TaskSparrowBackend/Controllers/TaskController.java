package com.example.TaskSparrowBackend.Controllers;

import Service.TaskService;
import com.example.TaskSparrowBackend.Models.Task;
import com.example.TaskSparrowBackend.Repositories.TaskRepository;
import com.example.TaskSparrowBackend.Requests.TaskRequest;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/task")
public class TaskController {
	
	private TaskService taskService;
	
	private TaskRepository taskRepository;
	
	private ModelMapper modelMapper;
	
	public TaskController(TaskService taskService, TaskRepository taskRepository, ModelMapper modelMapper) {
		this.taskService = taskService;
		this.taskRepository = taskRepository;
		this.modelMapper = modelMapper;
	}
	
	@PostMapping("/create")
	public ResponseEntity< Task > createTask( @RequestBody TaskRequest req ) {
		
		Task task = this.modelMapper.map(req, Task.class);
		taskRepository.save(task);
		return ResponseEntity.ok().body(task);
		
	}
	
	@PostMapping("/update")
	public ResponseEntity< Task > updateTask( @RequestParam Integer taskId, @RequestBody TaskRequest req ) {
		
		Task task = taskService.updateTask(taskId, req);
		if ( task == null ){
			return ResponseEntity.badRequest().body(null);
		}
		
		return ResponseEntity.ok().body(task);
		
	}
	
	@GetMapping("/find/{taskId}")
	public ResponseEntity< Task > findTaskById( @PathVariable Integer taskId ) {
		
		Task task = taskService.findTaskById(taskId);
		if ( task == null ){
			return ResponseEntity.badRequest().body(null);
		}
		
		return ResponseEntity.ok().body(task);
		
	}
	
	@GetMapping("/find/tasker/{tasker_id}")
	public ResponseEntity< ? > findTaskByTaskerId( @PathVariable Integer tasker_id ) {
		
		return ResponseEntity.ok().body(taskService.findTaskByTaskerId(tasker_id));
		
	}
	
	@GetMapping("/find/user/{user_id}")
	public ResponseEntity< ? > findTaskByUserId( @PathVariable Integer user_id ) {
		
		return ResponseEntity.ok().body(taskService.findTaskByUserId(user_id));
		
	}
	
}
