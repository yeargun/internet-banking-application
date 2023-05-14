package com.yeargun.bankingapp.currency;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/currency")
@RestController
public class CurrencyController {


    private final CurrencyService service;

    public CurrencyController(CurrencyService currencyService) {
        this.service = currencyService;
    }


    @GetMapping("/all")
    public ResponseEntity getAllAccounts(){
        return ResponseEntity.ok(   service.getAllCurrencies());
    }
}
