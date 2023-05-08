package com.yeargun.questionservice.transaction;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendMoneyRequest {
    private int amount;
    private String fromIBAN;
    private String toIBAN;

}
