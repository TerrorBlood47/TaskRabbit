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
public class AuthController2 {
	
	private UserService userService;
	

	private UserRepository userRepository;
	
	
	public AuthController2(UserService userService, UserRepository userRepository) {
		this.userService = userService;
		this.userRepository = userRepository;
	}
	
	@PostMapping(value = "/signup" , consumes = { MediaType.MULTIPART_FORM_DATA_VALUE} ,
			produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity< ApiResponse> SignUpHandler(
			@RequestParam String email
			,@RequestParam String name
			, @RequestParam String password,
			@RequestParam MultipartFile file) throws IOException {
		
		User isUser = userRepository.findByEmail(email);
		
		if ( isUser != null ){
			return ResponseEntity.ok(new ApiResponse("Email is used with another account : " + email, false));
		}
		
		User user = new User();
		user.setEmail(email);
		user.setName(name);
		user.setPassword(password);
		user.setProfile_pic(ImageUitls.compressImage(file.getBytes()));
		user.setContentType(file.getContentType());
		
		userRepository.save(user);
		
		return ResponseEntity.ok(new ApiResponse("User created successfully", true));
	}
	
	@GetMapping("/login")
	public ResponseEntity<?> LoginHandler( @RequestParam String email
			, @RequestParam String password ) throws UserException {
		User user = userService.findByEmailAndPassword(email, password);
		
		if(user == null){
			return ResponseEntity.ok(new ApiResponse("Invalid credentials", false));
		}
		
		return new ResponseEntity(user, HttpStatus.OK);
	}
	
	
}
