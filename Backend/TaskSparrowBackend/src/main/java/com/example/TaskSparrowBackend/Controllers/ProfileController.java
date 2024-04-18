package com.example.TaskSparrowBackend.Controllers;

import com.example.TaskSparrowBackend.Models.Profile;
import com.example.TaskSparrowBackend.Repositories.ProfileRepo;
import com.example.TaskSparrowBackend.Utils.ImageUitls;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/profile")
public class ProfileController {
	
	@Autowired
	private ProfileRepo profileRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping(value = "/uploadImage" , consumes = {MediaType.MULTIPART_FORM_DATA_VALUE} ,
	produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<?> UploadProfileImage( @RequestParam UUID img_id,
	                                             @RequestParam MultipartFile file) throws IOException {
		
		 Profile profileDispatcher = profileRepo.save(Profile.builder()
				.imgID(img_id)
				.name(file.getOriginalFilename())
				.type(file.getContentType())
				.profileImage(ImageUitls.compressImage(file.getBytes()))
				.build());
		
		 if (profileDispatcher != null) {
			 return ResponseEntity.status(HttpStatus.OK)
					 .body("Image Uploaded Successfully");
		}
		 
		 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				 .body("Image could not be uploaded");
	}
	
	
	@GetMapping("/downloadImage")
	public ResponseEntity<?> DownloadProfileImage(@RequestParam UUID img_id){
		Optional< Profile > profile = profileRepo.findById(img_id);
		byte[] imageBytes = ImageUitls.decompressImage(profile.get().getProfileImage());
		
		if(profile != null) {
			return ResponseEntity.status(HttpStatus.OK)
					.contentType(MediaType.valueOf(profile.get().getType()))
					.body(imageBytes);
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("MESSAGE : IMAGE NOT FOUND");
	}
}
