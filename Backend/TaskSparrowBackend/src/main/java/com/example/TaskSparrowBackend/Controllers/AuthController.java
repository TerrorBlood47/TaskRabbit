package com.example.TaskSparrowBackend.Controllers;


import com.example.TaskSparrowBackend.DataTransferModels.ResolverDTO;
import com.example.TaskSparrowBackend.DataTransferModels.DispatcherDTO;
import com.example.TaskSparrowBackend.Models.Dispatcher;
import com.example.TaskSparrowBackend.Models.Resolver;
import com.example.TaskSparrowBackend.Repositories.DispatcherRepo;
import com.example.TaskSparrowBackend.Repositories.ResolverRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private DispatcherRepo dispatcherRepo;
	
	@Autowired
	private ResolverRepo resolverRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping("/register/dispatcher/email")
	public ResponseEntity< Dispatcher > RegisterDispatcher( @RequestBody DispatcherDTO requestDispatcher ){
		
		Dispatcher dispatcher = this.modelMapper.map(requestDispatcher, Dispatcher.class);
		
		System.out.println(" dispatcher :" + dispatcher);
		System.out.println(" requestDispatcher" + requestDispatcher);
		
		try{
			int count_of_occurrence = Math.max(dispatcherRepo.countByEmail(requestDispatcher.getEmail()), dispatcherRepo.countByUserName(requestDispatcher.getUserName()));
			
			if(count_of_occurrence == 0){
				dispatcher.setID(UUID.randomUUID());
				dispatcherRepo.save(dispatcher);
				return ResponseEntity.ok().body(dispatcher);
			}
			else{
				dispatcher = dispatcherRepo.getByEmail(requestDispatcher.getEmail());
				return ResponseEntity.badRequest().body(dispatcher);
			}
			
		}catch (Exception e){
			e.printStackTrace();
			System.out.println(e.getCause());
		}
		
		return ResponseEntity.badRequest().body(null);
	}
	
	@GetMapping("/login/dispatcher/{email}")
	public ResponseEntity< Dispatcher > LoginDispatcherByEmail( @PathVariable String email) {
		Dispatcher dispatcher = dispatcherRepo.getByEmail(email);
		
		if (dispatcher != null) {
			return ResponseEntity.ok().body(dispatcher);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/login/dispatcher/{username}")
	public ResponseEntity< Dispatcher > LoginDispatcherByUsername( @PathVariable String username) {
		Dispatcher dispatcher = dispatcherRepo.getByUserName(username);
		
		if (dispatcher != null) {
			return ResponseEntity.ok().body(dispatcher);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	// Technical Specialist
	
	@PostMapping("/register/resolver")
	public ResponseEntity< Resolver > RegisterResolver( @RequestBody ResolverDTO requestResolver ){
		
		Resolver resolver = this.modelMapper.map(requestResolver, Resolver.class);
		
		System.out.println("\n resolver : " + resolver);
		System.out.println("\n requestResolver : " + requestResolver);
		
		try{
			int count_of_occurrence = Math.max(resolverRepo.countByEmail(requestResolver.getEmail()),
					resolverRepo.countByUserName(requestResolver.getUserName()));
			
			if(count_of_occurrence == 0){
				resolver.setID(UUID.randomUUID());
				resolverRepo.save(resolver);
				return ResponseEntity.ok().body(resolver);
			}
			else{
				resolver = resolverRepo.getByEmail(requestResolver.getEmail());
				return ResponseEntity.badRequest().body(resolver);
			}
			
		}catch (Exception e){
			e.printStackTrace();
			System.out.println(e.getCause());
		}
		
		return ResponseEntity.badRequest().body(null);
	}
	
	
	@GetMapping("/login/resolver/{email}")
	public ResponseEntity< Resolver > LoginResolverByEmail( @PathVariable String email) {
		Resolver resolver = resolverRepo.getByEmail(email);
		
		if (resolver != null) {
			return ResponseEntity.ok().body(resolver);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/login/resolver/{username}")
	public ResponseEntity< Resolver > LoginResolverByUsername( @PathVariable String username) {
		Resolver resolver = resolverRepo.getByUserName(username);
		
		if (resolver != null) {
			return ResponseEntity.ok().body(resolver);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
}
