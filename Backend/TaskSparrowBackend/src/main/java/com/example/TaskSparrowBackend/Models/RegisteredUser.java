package com.example.TaskSparrowBackend.Models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "registered_user")
public class RegisteredUser {
	@Id
	@Column(name = "id",nullable = false,unique = true)
	private UUID ID;
	@Column(name="user_name",nullable = false,unique = true)
	private String userName;
	@Column(name="email",nullable = false,unique = true)
	private String email;
	@Column(name="password",nullable = false)
	private String password;
	@Column(name = "last_name",nullable = false)
	private String lastName;
	@Column(name = "first_name",nullable = false)
	private String firstName;
	
	@Column(name = "date_of_birth",nullable = false)
	private LocalDate dateOfBirth;
	@Column(name = "nationality")
	private String nationality;
	@Column(name = "phone_number",nullable = false)
	private String phoneNumber;
	
	
	public RegisteredUser() {
	}
	
	public RegisteredUser( UUID ID, String userName, String email, String password, String lastName, String firstName, LocalDate dateOfBirth, String nationality, String phoneNumber ) {
		this.ID = ID;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.lastName = lastName;
		this.firstName = firstName;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
		this.phoneNumber = phoneNumber;
	}
	
	public UUID getID() {
		return ID;
	}
	
	public void setID( UUID ID ) {
		this.ID = ID;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName( String userName ) {
		this.userName = userName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail( String email ) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword( String password ) {
		this.password = password;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName( String lastName ) {
		this.lastName = lastName;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName( String firstName ) {
		this.firstName = firstName;
	}
	
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	
	public void setDateOfBirth( LocalDate dateOfBirth ) {
		this.dateOfBirth = dateOfBirth;
	}
	
	public String getNationality() {
		return nationality;
	}
	
	public void setNationality( String nationality ) {
		this.nationality = nationality;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	
	public void setPhoneNumber( String phoneNumber ) {
		this.phoneNumber = phoneNumber;
	}
	
	@Override
	public String toString() {
		return "RegisteredUser{" +
				"ID=" + ID +
				", userName='" + userName + '\'' +
				", email='" + email + '\'' +
				", password='" + password + '\'' +
				", lastName='" + lastName + '\'' +
				", firstName='" + firstName + '\'' +
				", dateOfBirth='" + dateOfBirth + '\'' +
				", nationality='" + nationality + '\'' +
				", phoneNumber=" + phoneNumber +
				'}';
	}
	
	
}
