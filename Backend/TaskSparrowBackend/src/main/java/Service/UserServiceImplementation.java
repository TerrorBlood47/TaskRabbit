package Service;

import com.example.TaskSparrowBackend.Exception.UserException;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Repositories.UserRepository;
import com.example.TaskSparrowBackend.Requests.UpdateUserRequest;
import com.example.TaskSparrowBackend.Utils.ImageUitls;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{
	
	
	private UserRepository userRepository;
	
	public UserServiceImplementation( UserRepository userRepository ) {
		this.userRepository = userRepository;
	}

	@Override
	public User findUserById( Integer id ) throws UserException {
		Optional<User> opt = userRepository.findById(id);
		
		if(opt.isPresent()){
			User user = opt.get();
			return user;
		}
		
		throw new UserException("User not found with id "+ id);
	}
	
	@Override
	public User updateUser( Integer userId, UpdateUserRequest req ) throws UserException {
		User user = findUserById(userId);
		
		if(req.getName()==null){
			throw new UserException("Name is required");
		}
		
		
		if(req.getPassword()==null){
			throw new UserException("Password is required");
		}
		
		user.setName(req.getName());
		
		user.setPassword(req.getPassword());
		
		
		return userRepository.save(user);
	}
	

	@Override
	public List< User > searchUser( String query ) {
		List<User> users = userRepository.searchUser(query);
		
		return users;
	}
	

	@Override
	public User findByEmailAndPassword( String email, String password ) {
		User user = userRepository.findByEmailAndPassword(email, password);
		
		if(user != null){
			return user;
		}
		
		return null;
	}
	
	
	@Override
	public User findByEmail( String email ) {
		User user = userRepository.findByEmail(email);
		if(user != null){
			
			return user;
		}
		return null;
	}
	
	@Override
	public void deleteUser( Integer userId ) {
		userRepository.deleteById(userId);
	}
}
