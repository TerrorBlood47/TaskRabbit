package com.example.TaskSparrowBackend.Controllers;


import com.example.TaskSparrowBackend.DataTransferModels.TechSpecialistDTO;
import com.example.TaskSparrowBackend.DataTransferModels.UserDTO;
import com.example.TaskSparrowBackend.Models.RegisteredUser;
import com.example.TaskSparrowBackend.Models.TechnicalSpecialist;
import com.example.TaskSparrowBackend.Repositories.RegisteredUserRepo;
import com.example.TaskSparrowBackend.Repositories.TechnicalSpecialistRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private RegisteredUserRepo userRepo;
	
	@Autowired
	private TechnicalSpecialistRepo techSpecRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping("/register/user/email")
	public ResponseEntity<RegisteredUser> UserRegister( @RequestBody UserDTO requestUser ){
		
		RegisteredUser user = this.modelMapper.map(requestUser,RegisteredUser.class);
		
		System.out.println(" user :" + user);
		System.out.println(" requestUser" + requestUser);
		
		try{
			int count_of_occurrence = Math.max(userRepo.countByEmail(requestUser.getEmail()), userRepo.countByUserName(requestUser.getUserName()));
			
			if(count_of_occurrence == 0){
				user.setID(UUID.randomUUID());
				userRepo.save(user);
				return ResponseEntity.ok().body(user);
			}
			else{
				user = userRepo.getUserByEmail(requestUser.getEmail());
				return ResponseEntity.badRequest().body(user);
			}
			
		}catch (Exception e){
			e.printStackTrace();
			System.out.println(e.getCause());
		}
		
		return ResponseEntity.badRequest().body(null);
	}
	
	@GetMapping("/login/user/username")
	public ResponseEntity<RegisteredUser> UserLoginByEmail(@RequestParam String email) {
		RegisteredUser user = userRepo.getUserByEmail(email);
		
		if (user != null) {
			return ResponseEntity.ok().body(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/login/user")
	public ResponseEntity<RegisteredUser> UserLoginByUsername(@RequestParam String userName) {
		RegisteredUser user = userRepo.getUserByUserName(userName);
		
		if (user != null) {
			return ResponseEntity.ok().body(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	// Technical Specialist
	
	@PostMapping("/register/technicalspecialist")
	public ResponseEntity<TechnicalSpecialist> TechSpecialistRegister( @RequestBody TechSpecialistDTO requestTechSpecialist ){
		
		TechnicalSpecialist  technicalSpecialist = this.modelMapper.map(requestTechSpecialist,TechnicalSpecialist.class);
		
		System.out.println("\n technical Specialist : " + technicalSpecialist);
		System.out.println("\n requestTechSpecialist : " + requestTechSpecialist);
		
		try{
			int count_of_occurrence = Math.max(techSpecRepo.countByEmail(requestTechSpecialist.getEmail()), techSpecRepo.countByUserName(requestTechSpecialist.getUserName()));
			
			if(count_of_occurrence == 0){
				technicalSpecialist.setID(UUID.randomUUID());
				techSpecRepo.save(technicalSpecialist);
				return ResponseEntity.ok().body(technicalSpecialist);
			}
			else{
				technicalSpecialist = techSpecRepo.getTechSpecByEmail(requestTechSpecialist.getEmail());
				return ResponseEntity.badRequest().body(technicalSpecialist);
			}
			
		}catch (Exception e){
			e.printStackTrace();
			System.out.println(e.getCause());
		}
		
		return ResponseEntity.badRequest().body(null);
	}
	
	@GetMapping("/login/technicalspecialist/email")
	public ResponseEntity<TechnicalSpecialist> TechSpecLoginByEmail(@RequestParam String email) {
		TechnicalSpecialist technicalSpecialist = techSpecRepo.getTechSpecByEmail(email);
		
		if (technicalSpecialist != null) {
			return ResponseEntity.ok().body(technicalSpecialist);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/login/technicalspecialist/username")
	public ResponseEntity<TechnicalSpecialist> TechSpecLoginByUsername(@RequestParam String userName) {
		TechnicalSpecialist technicalSpecialist = techSpecRepo.getTechSpecByUserName(userName);
		
		if (technicalSpecialist != null) {
			return ResponseEntity.ok().body(technicalSpecialist);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
}
