package com.example.TaskSparrowBackend.Models;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.*;

import java.util.UUID;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@Table(name = "profile_dispatcher")
public class ProfileDispatcher {
	@Id
	@Column(name="img_id", nullable = false, unique = true)
	private UUID imgID; // = Dispatcher's ID
	
	@Column(name = "profile_image_name")
	private String profileImageName;
	
	@Column(name = "profile_image")
	@Lob
	private byte[] profileImage;
	
	@OneToOne
	@MapsId // This tells JPA to use imgID as both PK and FK
	@JoinColumn(name = "img_id", referencedColumnName = "id")
	private Dispatcher dispatcher;
	
	
	public ProfileDispatcher( UUID requestImgId, String requestImageName, byte[] bytes ) {
	}
}
