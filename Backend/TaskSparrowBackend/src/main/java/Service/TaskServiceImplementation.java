package Service;

import com.example.TaskSparrowBackend.Models.Task;
import com.example.TaskSparrowBackend.Repositories.TaskRepository;
import com.example.TaskSparrowBackend.Requests.TaskRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImplementation implements TaskService{
	
	private TaskRepository taskRepository;
	
	public TaskServiceImplementation( TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}
	
	
	@Override
	public Task findTaskById( Integer taskId ) {
		Task task = taskRepository.findById(taskId).get();
		if ( task != null ){
			return task;
		}
		return null;
	}
	
	@Override
	public List< Task > findTaskByTaskerId( Integer tasker_id ) {
		List<Task> tasks = taskRepository.findByTaskerId(tasker_id);
		return tasks;
	}
	
	@Override
	public List< Task > findTaskByUserId( Integer user_id ) {
		List<Task> tasks = taskRepository.findByUserId(user_id);
		return tasks;
	}
	
	@Override
	public Task updateTask( Integer taskId, TaskRequest req ) {
		Task task = taskRepository.findById(taskId).get();
		
		if ( task == null ){
			return null;
		}
		
		task.setArea(req.getArea());
		task.setTitle(req.getTitle());
		task.setDescription(req.getDescription());
		task.setWage(req.getWage());
		task.setTaskId(req.getTaskerId());
		task.setUserId(req.getUserId());
		task.setStatus(req.getStatus());
		task.setDate(req.getDate());
		task.setTime_of_the_day(req.getTime_of_the_day());
		task.setDuration(req.getDuration());
		
		taskRepository.save(task);
		return task;
	}
	
	@Override
	public void deleteTask( Integer taskId ) {
		taskRepository.deleteById(taskId);
		
	}
	
}
