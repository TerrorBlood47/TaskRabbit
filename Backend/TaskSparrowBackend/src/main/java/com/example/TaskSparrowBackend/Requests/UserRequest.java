package com.example.TaskSparrowBackend.Requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserRequest {
	private String name;
	String email;
	private String password;
}
