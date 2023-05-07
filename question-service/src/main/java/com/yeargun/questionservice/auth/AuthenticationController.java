package com.yeargun.questionservice.auth;

import com.yeargun.questionservice.entity.User;
import com.yeargun.questionservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Autowired
    private final UserRepository repository;

    @PostMapping("/register")
    public ResponseEntity register(
            @RequestBody RegisterRequest request
    ) {
        try {
            LoginResponse response = service.register(request);
            return ResponseEntity.ok(response);
        } catch (DataAccessException e) {
            Throwable cause = e.getCause();
            if (cause instanceof SQLException) {
                SQLException sqlException = (SQLException) cause;
                return ResponseEntity.badRequest().body(sqlException.getMessage());
            } else {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(
            @RequestBody LoginRequest request, @RequestHeader Map<String, String> headers) {

        headers.forEach((key, value) -> {
            System.out.println(String.format("Header '%s' = %s", key, value));
        });

        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/getAllBranchCodes")
    public ResponseEntity authenticate() {
        return ResponseEntity.ok(service.getAllBranchCodes());
    }


}

