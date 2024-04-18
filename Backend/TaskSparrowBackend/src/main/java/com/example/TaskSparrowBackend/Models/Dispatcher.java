package com.example.TaskSparrowBackend.Models;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dispatcher")
public class Dispatcher {
	@Id
	@Column(name = "id",nullable = false,unique = true)
	private UUID ID;
	@Column(name="user_name",nullable = false,unique = true)
	private String userName;
	@Column(name="email",nullable = false,unique = true)
	private String email;
	@Column(name="password",nullable = false)
	private String password;
	@Column(name = "last_name",nullable = false)
	private String lastName;
	@Column(name = "first_name",nullable = false)
	private String firstName;
	
	@Column(name = "date_of_birth",nullable = false)
	private LocalDate dateOfBirth;
	@Column(name = "nationality")
	private String nationality;
	@Column(name = "phone_number",nullable = false)
	private String phoneNumber;
	
	
	
}
