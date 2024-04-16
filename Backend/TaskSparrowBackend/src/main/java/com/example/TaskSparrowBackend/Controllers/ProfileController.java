package com.example.TaskSparrowBackend.Controllers;

import com.example.TaskSparrowBackend.Models.ProfileDispatcher;
import com.example.TaskSparrowBackend.Repositories.ProfileDispatcherRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/profile")
public class ProfileController {
	
	@Autowired
	private ProfileDispatcherRepo profileDispatcherRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping("/addImage")
	public String AddProfileImage( @RequestParam UUID requestImgId,
	                               @RequestParam String requestImageName,
	                               @RequestParam MultipartFile requestImageFile ) throws IOException {
		
		ProfileDispatcher profileDispatcher = new ProfileDispatcher(requestImgId,requestImageName,
				requestImageFile.getBytes());
		
		if(profileDispatcher != null){
			profileDispatcher = profileDispatcherRepo.save(profileDispatcher);
			return "image saved successfully\n" + profileDispatcher;
		}
		else{
			return "image could not be saved\n" + profileDispatcher;
		}
		
	}
}
