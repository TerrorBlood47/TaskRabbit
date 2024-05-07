package com.example.TaskSparrowBackend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Objects;


@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "tasker")
public class Tasker {
	
	@Id
	@Column(name = "tasker_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer tasker_id;
	
	@Column(name = "role")
	private String role;
	
	@Column(name = "area")
	private String area;
	
	@Column(name = "min_wage_per_hour")
	private Integer minWagePerHour;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "user_id",unique = true,nullable = false)
	private Integer userId;
	
	
}
