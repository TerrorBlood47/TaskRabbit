package com.example.TaskSparrowBackend.Requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskerRequest {
	
	private String role;
	private String area;
	private Integer minWagePerHour;
	private String phoneNumber;
	private Integer userId;
	
	
}
