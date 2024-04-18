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
@Table(name = "profile_dispatcher")
public class Profile {
	@Id
	@Column(name="img_id", nullable = false, unique = true)
	private UUID imgID; // = Dispatcher's/ Resolver's ID
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "type")
	private String type;
	
	@Lob
	@Column(name = "profile_image")
	private byte[] profileImage;
	
}
