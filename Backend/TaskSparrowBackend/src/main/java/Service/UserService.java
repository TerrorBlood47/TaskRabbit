package Service;

import com.example.TaskSparrowBackend.Exception.UserException;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Requests.UpdateUserRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface UserService {
	public User findUserById( Integer id) throws UserException;
	public User updateUser( Integer userId, UpdateUserRequest req) throws UserException;
	public List<User> searchUser( String query);
	public User findByEmailAndPassword( String email, String password) throws
			UserException;
	
	public User findByEmail( String email );
}
