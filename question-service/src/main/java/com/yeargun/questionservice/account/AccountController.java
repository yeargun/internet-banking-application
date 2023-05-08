package com.yeargun.questionservice.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity getAllAccounts(Authentication authentication){
        System.out.println(authentication.getPrincipal());
        String personId = (String) authentication.getName();
        return ResponseEntity.ok(service.getAllAccounts(personId));
    }

    @PostMapping("")
    public ResponseEntity createNewAccount(Authentication authentication, @RequestBody CreateAccountRequest request){
        String personId = (String) authentication.getName();
        return ResponseEntity.ok(service.createNewAccount(request, personId));
    }


}