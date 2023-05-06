package com.yeargun.questionservice.repository;

import com.yeargun.questionservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
