package com.yeargun.questionservice.transaction;

import com.yeargun.questionservice.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/transaction")
@RestController
public class TransactionController {
    @Autowired
    private TransactionService service;


    @GetMapping("/all")
    public ResponseEntity getNextQuestion(){
        return ResponseEntity.ok(service.getAllTransactions());
    }
}
