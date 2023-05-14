package com.yeargun.bankingapp.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String idNumber;
    private String name;
    private String surname;
    private String gender;
    private String email;
    private String password;
    private String phoneNumber;
    private String registeredBranchCode;
}
