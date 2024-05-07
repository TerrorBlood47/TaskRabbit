package com.example.TaskSparrowBackend.Requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateUserRequest {
	
	private String name;
	private byte[] profile_pic;
	private String contentType;
	private String password;
}
