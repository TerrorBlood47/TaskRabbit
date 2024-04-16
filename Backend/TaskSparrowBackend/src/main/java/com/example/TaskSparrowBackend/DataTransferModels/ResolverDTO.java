package com.example.TaskSparrowBackend.DataTransferModels;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ResolverDTO {
	private String userName;
	private String email;
	private String password;
	private String lastName;
	private String firstName;
	private LocalDate dateOfBirth;
	private String nationality;
	private String phoneNumber;
	private String role;
}
