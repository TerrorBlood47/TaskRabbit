package com.example.TaskSparrowBackend.Requests;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfileRequest {
	
	private Boolean isTasker;
	
	private Integer contact;
	
	private String profession;
	
	 private String address;
	
	private Double longitude;
	private Double latitude;
	
	private Integer userID;
}
