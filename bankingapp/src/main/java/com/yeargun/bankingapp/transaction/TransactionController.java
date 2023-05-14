package com.yeargun.bankingapp.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/transaction")
@RestController
public class TransactionController {
    @Autowired
    private TransactionService service;


    @GetMapping("/all")
    public ResponseEntity getAllTransactions(Authentication authentication){
        String personId = (String) authentication.getName();
        return ResponseEntity.ok(service.getAllTransactions(personId));
    }

    @PostMapping("")
    public ResponseEntity sendMoney(Authentication authentication, @RequestBody SendMoneyRequest request){
        String personId = (String) authentication.getName();
        return ResponseEntity.ok(service.sendMoney(request, personId));
    }
}
