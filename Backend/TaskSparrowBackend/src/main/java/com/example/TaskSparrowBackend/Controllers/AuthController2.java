package com.example.TaskSparrowBackend.Controllers;


import Service.UserService;
import com.example.TaskSparrowBackend.Exception.UserException;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Repositories.UserRepository;
import com.example.TaskSparrowBackend.Requests.UserRequest;
import com.example.TaskSparrowBackend.Responses.ApiResponse;
import com.example.TaskSparrowBackend.Utils.ImageUitls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController2 {
	
	private UserService userService;
	

	private UserRepository userRepository;
	
	
	public AuthController2(UserService userService, UserRepository userRepository) {
		this.userService = userService;
		this.userRepository = userRepository;
	}
	
	@PostMapping(value = "/signup")
	public ResponseEntity< ? > SignUpHandler(
			@RequestBody UserRequest req
			) throws IOException {
		
		User isUser = userRepository.findByEmail(req.getEmail());
		
		if ( isUser != null ){
			return ResponseEntity.ok(new ApiResponse("Email is used with another account : " + req.getEmail(), false));
		}
		
		User user = new User();
		user.setEmail(req.getEmail());
		user.setName(req.getName());
		user.setPassword(req.getPassword());
		
		
		userRepository.save(user);
		
		return ResponseEntity.ok(user);
	}
	
	@GetMapping ("/login")
	public ResponseEntity<?> LoginHandler( @RequestParam String email
			, @RequestParam String password ) throws UserException {
		User user = userService.findByEmailAndPassword(email, password);
		
		if(user == null){
			return ResponseEntity.ok(new ApiResponse("User not found", false));
		}
		System.out.println(user);
		return ResponseEntity.ok(user);
	}
	
	
}
