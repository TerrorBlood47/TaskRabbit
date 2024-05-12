package Service;

import com.example.TaskSparrowBackend.Models.Task;
import com.example.TaskSparrowBackend.Models.Tasker;
import com.example.TaskSparrowBackend.Models.User;
import com.example.TaskSparrowBackend.Requests.TaskRequest;

import java.util.List;
import java.util.Optional;

public interface TaskService {
	
	public Task findTaskById( Integer taskId);
	public List<Task> findTaskByTaskerId( Integer tasker_id);
	public List<Task> findTaskByUserId( Integer user_id);
	public Task updateTask( Integer taskId, TaskRequest req);
	
	public void deleteTask( Integer taskId );
}
