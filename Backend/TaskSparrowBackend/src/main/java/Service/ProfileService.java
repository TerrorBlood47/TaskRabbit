package Service;

import com.example.TaskSparrowBackend.Models.Profile;
import com.example.TaskSparrowBackend.Requests.ProfileRequest;

public interface ProfileService {
	
	public Profile updateProfile( ProfileRequest req);
	
	public Profile createProfile( ProfileRequest req);
	
	public Profile getProfileByUserId( Integer userId);
}
