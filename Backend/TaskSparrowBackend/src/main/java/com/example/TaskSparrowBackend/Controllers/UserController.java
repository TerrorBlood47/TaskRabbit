package com.example.TaskSparrowBackend.Controllers;

import Service.UserService;
import com.example.TaskSparrowBackend.Exception.UserException;
import com.example.TaskSparrowBackend.Models.Profile;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Requests.UpdateUserRequest;
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
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	public UserController( UserService userService ) {
		this.userService = userService;
	}
	
	@GetMapping("/{query}")
	public ResponseEntity< List< User > > searchUserHandler( @PathVariable("query") String query){
		List<User> users = userService.searchUser(query);
		
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity< ApiResponse > updateUserHandler( @RequestBody UserRequest req,
	                                                        @RequestParam("userId") Integer userId)
			throws UserException, IOException {
		
		UpdateUserRequest updateUserRequest = new UpdateUserRequest();
		updateUserRequest.setName(req.getName());
		updateUserRequest.setPassword(req.getPassword());
		
		
		userService.updateUser(userId, updateUserRequest);
		
		ApiResponse res = new ApiResponse("USER UPDATED SUCCESFULLY", true);
		
		return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity< ApiResponse > deleteUserHandler( @PathVariable Integer userId ) throws UserException {
		
		userService.deleteUser(userId);
		
		ApiResponse res = new ApiResponse("USER DELETED SUCCESFULLY", true);
		
		return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
	}
	
//	@GetMapping("/profile_pic/{userId}")
//	public ResponseEntity<?> DownloadProfileImage(@RequestParam Integer userId) throws UserException {
//		User user = userService.findUserById(userId);
//
//		if(user != null) {
//			return ResponseEntity.status(HttpStatus.OK)
//					.contentType(MediaType.valueOf(user.getContentType()))
//					.body(user.getProfile_pic());
//		}
//
//		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("MESSAGE : IMAGE NOT FOUND");
//	}
}
