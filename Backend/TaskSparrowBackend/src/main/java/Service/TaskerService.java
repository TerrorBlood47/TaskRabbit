package Service;

import com.example.TaskSparrowBackend.Models.Tasker;
import com.example.TaskSparrowBackend.Models.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TaskerService {
	
	public List< Tasker > findTaskerByRole(String role);
	
	public Set< Tasker > findTaskerByArea( List<String> areas);
	
	public List<Tasker> findTaskerByMinWagePerHour(Integer minWagePerHour);
	
	public Optional< User > findUserByTaskerId( Integer taskerId);
	
	public Tasker findTaskerByUserId( Integer userId);
	
}
