package com.example.TaskSparrowBackend.Requests;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
	
	
	private String title;
	private String description;
	
	private Integer userId ;
	private Integer taskerId;
	private Integer wage;
	private String area;
	
	private Date date;
	
	private String time_of_the_day;
	
	private Integer duration;
	
	
	private String status;
}
