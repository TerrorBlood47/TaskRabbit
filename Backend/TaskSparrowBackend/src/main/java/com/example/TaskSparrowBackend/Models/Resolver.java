package com.example.TaskSparrowBackend.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "resolver")
public class Resolver {
	
	@Id
	@Column(name = "id",nullable = false,unique = true)
	private UUID ID;
	@Column(name="user_name",nullable = false,unique = true)
	private String userName;
	@Column(name="email",nullable = false,unique = true)
	private String email;
	@Column(name="password",nullable = false)
	private String password;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;
	@Column(name = "nationality")
	private String nationality;
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "role")
	private String role;
	
	
}
