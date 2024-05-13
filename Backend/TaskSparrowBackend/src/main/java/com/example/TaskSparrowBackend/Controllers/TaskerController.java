package com.example.TaskSparrowBackend.Controllers;

import Service.TaskerService;
import com.example.TaskSparrowBackend.Models.Tasker;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Repositories.TaskerRepository;
import com.example.TaskSparrowBackend.Repositories.UserRepository;
import com.example.TaskSparrowBackend.Requests.TaskerRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/tasker")
public class TaskerController {
	
	private TaskerService taskerService;
	
	private UserRepository userRepository;
	
	private TaskerRepository taskerRepository;
	
	public TaskerController(TaskerService taskerService, UserRepository userRepository, TaskerRepository taskerRepository) {
		this.taskerService = taskerService;
		this.userRepository = userRepository;
		this.taskerRepository = taskerRepository;
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addTaskerHandler( @RequestBody TaskerRequest req){
		Optional< User > opt = userRepository.findById(req.getUserId());
		
		if ( opt.isEmpty() ){
			return ResponseEntity.badRequest().body("User not found");
		}
		
		Tasker tasker = new Tasker();
		tasker.setRole(req.getRole());
		tasker.setArea(req.getArea());
		tasker.setMinWagePerHour(req.getMinWagePerHour());
		tasker.setUserId(req.getUserId());
		tasker.setPhoneNumber(req.getPhoneNumber());
		
		return ResponseEntity.ok(taskerRepository.save(tasker));
	}
	
	
	@GetMapping("/role/{role}")
	public ResponseEntity<?> findTaskerByRoleHandler( @PathVariable("role") String role){
		System.out.println("role" + role);
		List<Tasker> taskers = taskerService.findTaskerByRole(role);
		
		System.out.println("tasker "+taskers);
		return ResponseEntity.ok(taskers);
	}
	
	@GetMapping("/area/{areas}")
	public List<Tasker> findTaskerByAreaHandler( @PathVariable("areas") List<String> areas){
		Set<Tasker> taskerSet =  taskerService.findTaskerByArea(areas);
		
		return List.copyOf(taskerSet);
	}
	
	@GetMapping("/minWagePerHour/{minWagePerHour}")
	public List< Tasker > findTaskerByMinWagePerHourHandler( @PathVariable("minWagePerHour") Integer minWagePerHour){
		List<Tasker> taskers = taskerService.findTaskerByMinWagePerHour(minWagePerHour);
		
		return taskers;
	}
	
	@GetMapping("/userId/{userId}")
	public Tasker findTaskerByUserIdHandler( @PathVariable("userId") Integer userId){
		System.out.println("user id" + userId);
		Tasker tasker = taskerService.findTaskerByUserId(userId);
		
		System.out.println(tasker);
		
		return tasker;
	}
	
	@GetMapping("/user/{taskerId}")
	public Tasker findUserByTaskerIdHandler( @PathVariable("taskerId") Integer taskerId){
		Tasker tasker = taskerService.findTaskerByUserId(taskerId);
		
		return tasker;
	}
	
	
	
}
