package com.example.TaskSparrowBackend.Repositories;

import com.example.TaskSparrowBackend.Models.ProfileDispatcher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileDispatcherRepo extends JpaRepository< ProfileDispatcher, UUID> {

}
