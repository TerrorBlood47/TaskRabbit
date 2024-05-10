package com.example.TaskSparrowBackend.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "profile")
public class Profile {
	@Id
	@Column(name="profile_id", nullable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer profileId;
	
	@Column(name = "is_tasker")
	private Boolean isTasker;
	
	@Column(name = "type")
	private String contentType;
	
	@Lob
	@Column(name = "profile_image",nullable = true)
	private byte[] profileImage;
	
	private Integer contact;
	
	private String profession;
	
	private String address;
	
	private Double longitude;
	private Double latitude;
	
	@Column(name = "user_id", nullable = false, unique = true)
	private Integer userId;
}
