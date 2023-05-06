package com.yeargun.questionservice.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/account")
@RestController
public class AccountController {

    @Autowired
    private AccountService service;


    @GetMapping("/all")
    public ResponseEntity getNextQuestion(){
        return ResponseEntity.ok(service.getAllAccounts());
    }


}