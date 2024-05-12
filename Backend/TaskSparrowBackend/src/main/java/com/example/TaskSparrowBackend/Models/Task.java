package com.example.TaskSparrowBackend.Models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "task")
public class Task {
	
	@Id
	@Column(name = "task_id", nullable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer taskId;
	
	@Column(name = "title", nullable = false)
	private String title;
	private String description;
	@Column(name = "user_id", nullable = false)
	private Integer userId;
	private Integer taskerId;
	private Integer wage;
	private String area;
	@Column(name = "date")
	private String date;
	@Column(name = "time_of_the_day")
	private String time_of_the_day;
	@Column(name = "duration")
	private Integer duration;
	
	@Column(name = "status", nullable = false)
	private String status;
}
