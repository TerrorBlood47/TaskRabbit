package com.example.TaskSparrowBackend.Responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
	private String message;
	private boolean status;
}
