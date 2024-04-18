package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileRepo extends JpaRepository< Profile, UUID> {

}
