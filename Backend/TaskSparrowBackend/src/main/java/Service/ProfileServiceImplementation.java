package Service;

import com.example.TaskSparrowBackend.Models.Profile;
import com.example.TaskSparrowBackend.Repositories.ProfileRepository;
import com.example.TaskSparrowBackend.Requests.ProfileRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileServiceImplementation implements ProfileService{

	@Autowired
	private ProfileRepository profileRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public ProfileServiceImplementation( ProfileRepository profileRepository, ModelMapper modelMapper ) {
		this.profileRepository = profileRepository;
		this.modelMapper = modelMapper;
	}
	
	
	@Override
	public Profile updateProfile( ProfileRequest req ) {
		Optional<Profile> opt = profileRepository.findByUserId(req.getUserID());
		
		if(opt.isPresent()){
			Profile profile = opt.get();
			
			profile.setIsTasker(req.getIsTasker());
			profile.setContact(req.getContact());
			profile.setProfession(req.getProfession());
			profile.setAddress(req.getAddress());
			profile.setLongitude(req.getLongitude());
			profile.setLatitude(req.getLatitude());
			
			return profileRepository.save(profile);
		}
		
		return null;
	}
	
	@Override
	public Profile createProfile( ProfileRequest req ) {
		Optional<Profile> opt = profileRepository.findByUserId(req.getUserID());
		
		if ( opt.isPresent() ){
			return opt.get();
		}
		
		
		return null;
	
	}
	
	@Override
	public Profile getProfileByUserId( Integer userId ) {
		Optional<Profile> opt = profileRepository.findByUserId(userId);
		
		if ( opt.isPresent() ){
			return opt.get();
		}
		
		return null;
	}
}
