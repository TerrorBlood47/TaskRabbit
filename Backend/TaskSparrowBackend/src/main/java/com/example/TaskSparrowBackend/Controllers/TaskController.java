package com.example.TaskSparrowBackend.Controllers;

import Service.TaskService;
import com.example.TaskSparrowBackend.Models.Task;
import com.example.TaskSparrowBackend.Models.Tasker;
import com.example.TaskSparrowBackend.Repositories.TaskRepository;
import com.example.TaskSparrowBackend.Requests.TaskRequest;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {
	
	private TaskService taskService;
	
	private TaskRepository taskRepository;
	
	
	
	public TaskController(TaskService taskService, TaskRepository taskRepository) {
		this.taskService = taskService;
		this.taskRepository = taskRepository;
		
	}
	
	@PostMapping("/create")
	public ResponseEntity< Task > createTask( @RequestBody TaskRequest req ) {
		
		System.out.println("task create request : "+req.toString());
		
		if (req.getUserId() == null) {
			return ResponseEntity.badRequest().body(null);
		}
		
		//Task task = this.modelMapper.map(req, Task.class);
		Task task = new Task();
		task.setArea(req.getArea());
		task.setTitle(req.getTitle());
		task.setDescription(req.getDescription());
		task.setWage(req.getWage());
		task.setTaskerId(req.getTaskerId());
		task.setUserId(req.getUserId());
		task.setStatus(req.getStatus());
		task.setTaskerRole(req.getTaskerRole());
		task.setDate(req.getDate());
		task.setTime_of_the_day(req.getTime_of_the_day());
		task.setDuration(req.getDuration());
		
		return ResponseEntity.ok().body(taskRepository.save(task));
		
	}
	
	@PostMapping("/update")
	public ResponseEntity< Task > updateTask( @RequestParam Integer taskId, @RequestParam Integer taskerId ) {
		
		Task task = taskRepository.findById(taskId).get();
		if ( task == null ){
			return ResponseEntity.badRequest().body(null);
		}
		
		task.setTaskerId(taskerId);
		return ResponseEntity.ok().body(taskRepository.save(task));
		
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
	
	@GetMapping("find/pending/{taskerId}")
	public ResponseEntity<?> findPendingTasksByTaskerIdHandler( @PathVariable("taskerId") Integer taskerId){
		
		if (!(taskerId instanceof Integer)){
			System.out.println("tasker id is not an integer");
			return ResponseEntity.badRequest().body("Tasker id is not an integer");
		}
		
		
		System.out.println("tasker id" + taskerId);
		List<Task> tasks = taskRepository.findPendingTasksByTaskerId(taskerId);
		System.out.println(tasks);
		return ResponseEntity.ok(tasks);
	}
	
	@GetMapping("find/accepted/{taskerId}")
	public ResponseEntity<?> findAcceptedTasksByTaskerIdHandler( @PathVariable("taskerId") Integer taskerId){
		
		if (!(taskerId instanceof Integer)){
			System.out.println("tasker id is not an integer");
			return ResponseEntity.badRequest().body("Tasker id is not an integer");
		}
		
		
		System.out.println("tasker id" + taskerId);
		List<Task> tasks = taskRepository.findAcceptedTasksByTaskerId(taskerId);
		System.out.println(tasks);
		return ResponseEntity.ok(tasks);
	}
	
	
	
	@GetMapping("find/pending/user/{userId}")
	public ResponseEntity<?> findPendingTasksByUserIdHandler( @PathVariable("userId") Integer userId){
		
		if (!(userId instanceof Integer)){
			System.out.println("user id is not an integer");
			return ResponseEntity.badRequest().body("user id is not an integer");
		}
		
		
		System.out.println("user id" + userId);
		List<Task> tasks = taskRepository.findPendingTasksByUserId(userId);
		System.out.println(tasks);
		return ResponseEntity.ok(tasks);
	}
	
	@GetMapping("find/accepted/user/{userId}")
	public ResponseEntity<?> findAcceptedTasksByUserIdHandler( @PathVariable("userId") Integer userId){
		
		if (!(userId instanceof Integer)){
			System.out.println("user id is not an integer");
			return ResponseEntity.badRequest().body("user id is not an integer");
		}
		
		
		System.out.println("user id" + userId);
		List<Task> tasks = taskRepository.findAcceptedTasksByUserId(userId);
		System.out.println(tasks);
		return ResponseEntity.ok(tasks);
	}
	
	@DeleteMapping("/delete/{taskId}")
	public ResponseEntity< ? > deleteTask( @PathVariable Integer taskId ) {
		
		taskService.deleteTask(taskId);
		return ResponseEntity.ok().body("Task deleted successfully");
		
	}
	
	
	@PostMapping("/completed/{taskId}")
	public ResponseEntity< ? > completeTask( @PathVariable Integer taskId ) {
		
		Task task = taskService.findTaskById(taskId);
		if ( task == null ){
			return ResponseEntity.badRequest().body("Task not found");
		}
		
		task.setStatus("completed");
		taskRepository.save(task);
		return ResponseEntity.ok().body("Task completed successfully");
		
	}
	
	@PostMapping("/accepted/{taskId}")
	public ResponseEntity< ? > acceptTask( @PathVariable Integer taskId ) {
		
		Task task = taskService.findTaskById(taskId);
		if ( task == null ){
			return ResponseEntity.badRequest().body("Task not found");
		}
		
		task.setStatus("ACCEPTED");
		taskRepository.save(task);
		return ResponseEntity.ok().body("Task accepted successfully");
		
	}
	
	@PostMapping("/rejected/{taskId}")
	public ResponseEntity< ? > rejectTask( @PathVariable Integer taskId ) {
		
		Task task = taskService.findTaskById(taskId);
		if ( task == null ){
			return ResponseEntity.badRequest().body("Task not found");
		}
		
		task.setStatus("REJECTED");
		taskRepository.save(task);
		return ResponseEntity.ok().body("Task completed successfully");
		
	}
	
}
