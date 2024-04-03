package com.example.TaskSparrowBackend.DataTransferModels;

import lombok.*;

import java.time.LocalDate;


@Data
@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserDTO {
	
	private String userName;
	private String email;
	private String password;
	private String lastName;
	private String firstName;
	private LocalDate dateOfBirth;
	private String nationality;
	private String phoneNumber;
	
}
