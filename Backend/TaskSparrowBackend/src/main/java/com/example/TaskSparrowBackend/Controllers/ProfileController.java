package com.example.TaskSparrowBackend.Controllers;

import Service.ProfileService;
import com.example.TaskSparrowBackend.Models.Profile;
import com.example.TaskSparrowBackend.Repositories.ProfileRepository;
import com.example.TaskSparrowBackend.Utils.ImageUitls;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/user/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
	
	@Autowired
	private ProfileRepository profileRepo;
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private ModelMapper modelMapper;

	private final String ProfileImageFolder = "C:\\Users\\Zisan-23\\Desktop\\SWE_Project\\TaskSparrow\\Backend\\TaskSparrowBackend\\src\\main\\java\\com\\example\\TaskSparrowBackend\\Profile";
	
	@PostMapping("/update")
	public ResponseEntity< ? > updateProfileHandler( @RequestParam("userId") Integer userId,
	                                         @RequestParam(value = "isTasker",required = false) Boolean isTasker,
	                                         @RequestParam(value = "contact", required = false) Integer contact,
	                                         @RequestParam(value = "profession",required = false) String profession,
	                                         @RequestParam(value = "address",required = false) String address,
	                                         @RequestParam(value = "longitude",required = false) Double longitude,
	                                         @RequestParam(value = "latitude",required = false) Double latitude) throws IOException {
		
		Optional<Profile> opt = profileRepo.findByUserId(userId);
		
		if(opt.isPresent()){
			Profile profile = opt.get();
			
			profile.setIsTasker(isTasker? isTasker : profile.getIsTasker());
			profile.setContact(contact!=null ? contact : profile.getContact());
			profile.setProfession(profession!=null ? profession : profile.getProfession());
			profile.setAddress(address!=null ? address : profile.getAddress());
			profile.setLongitude(longitude);
			profile.setLatitude(latitude);
			
			profile = profileRepo.save(profile);
			
			
			return ResponseEntity.ok(profile);
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile not found");
	}
	
	
	@PostMapping("/create")
	public ResponseEntity< ? > createProfileHandler( @RequestParam("userId") Integer userId,
	                                         @RequestParam(value = "isTasker", required = false) Boolean isTasker,
	                                         @RequestParam(value = "contact",required = false) Integer contact,
	                                         @RequestParam(value = "profession",required = false) String profession,
	                                         @RequestParam(value = "address",required = false) String address,
	                                         @RequestParam(value = "longitude",required = false) Double longitude,
	                                         @RequestParam(value = "latitude",required = false) Double latitude) throws IOException {
		
		Optional<Profile> opt = profileRepo.findByUserId(userId);
		
		if ( opt.isPresent() ){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile already exists");
		}
		
		Profile profile = Profile.builder()
				.isTasker(isTasker)
				.contact(contact)
				.profession(profession)
				.address(address)
				.longitude(longitude)
				.latitude(latitude)
				.userId(userId)
				.build();
		
		profile = profileRepo.save(profile);
		
		return ResponseEntity.ok(profile);
	
	}
	
	
	@GetMapping("/get/{userID}")
	public ResponseEntity< ? > getProfileByUserIdHandler( @PathVariable Integer userID ) {
		Optional<Profile> opt = profileRepo.findByUserId(userID);
		
		if ( opt.isPresent() ){
			Profile profile = opt.get();
			
			return ResponseEntity.ok(profile);
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile not found");
	}
	
	
	@PostMapping(path = "/upload/image/{userId}", consumes ={MediaType.APPLICATION_JSON_VALUE ,MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity< ? > uploadProfileImageHandler( @PathVariable Integer userId,
	                                             @RequestParam("image") MultipartFile image) throws IOException {
		
		Optional<Profile> opt = profileRepo.findByUserId(userId);
		
		if ( opt.isEmpty() ){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile not found");
		}
		
		Profile profile = opt.get();
		
		//String imageName = UUID.randomUUID().toString();
		String imagePath = ProfileImageFolder + "\\" + System.currentTimeMillis()+"_"+image.getOriginalFilename();
		
		System.out.println("Image Path: " + imagePath) ;
		
		image.transferTo(new File(imagePath));
		
		profile.setProfileImage(imagePath);
		
		profile = profileRepo.save(profile);
		
		return ResponseEntity.ok(profile);
	}
	
	
	
	@GetMapping("/download/image/{userId}")
	public ResponseEntity<?> downloadProfileImageHandler( @PathVariable Integer userId ) throws IOException {
		
		Optional<Profile> opt = profileRepo.findByUserId(userId);
		
		if ( opt.isEmpty() ){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile not found");
		}
		
		Profile profile = opt.get();
		
		String path = profile.getProfileImage();
		
		byte[] image = Files.readAllBytes(new File(path).toPath());
		
		return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_JPEG)
				.body(image);
		
		
	}
	
}
