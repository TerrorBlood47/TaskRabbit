package Service;

import com.example.TaskSparrowBackend.Models.Tasker;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Repositories.TaskerRepository;
import com.example.TaskSparrowBackend.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TaskerServiceImplementation implements TaskerService{
	
	private TaskerRepository taskerRepository;
	
	private UserRepository userRepository;
	
	public TaskerServiceImplementation(TaskerRepository taskerRepository, UserRepository userRepository) {
		this.taskerRepository = taskerRepository;
		this.userRepository = userRepository;
	}
	
	
	@Override
	public List< Tasker > findTaskerByRole( String role ) {
		List<Tasker> taskers = taskerRepository.findByRole(role);
		return taskers;
	}
	
	@Override
	public Set< Tasker > findTaskerByArea( List< String > areas ) {
		Set<Tasker> taskers = new HashSet<>();
		
		for (String area : areas) {
			List<Tasker> taskerList = taskerRepository.findByArea(area);
			taskers.addAll(taskerList);
		}
		
		return taskers;
	}
	
	@Override
	public List< Tasker > findTaskerByMinWagePerHour( Integer minWagePerHour ) {
		List<Tasker> taskers = taskerRepository.findByMinWagePerHour(minWagePerHour);
		return taskers;
	}
	
	@Transactional
	@Override
	public Optional< User > findUserByTaskerId( Integer taskerId ) {
		Optional< Tasker > opt = taskerRepository.findById(taskerId);
		
		if ( opt.isEmpty() ){
			return null;
		}
		
		
		Optional< User > user = userRepository.findById(opt.get().getUserId());
		
		if ( user.isEmpty() ){
			return null;
		}
		
		return user;
	}
	

	@Override
	public Tasker findTaskerByUserId( Integer userId ) {
		Tasker tasker = taskerRepository.findByUserId(userId);
		return tasker;
	}
}
