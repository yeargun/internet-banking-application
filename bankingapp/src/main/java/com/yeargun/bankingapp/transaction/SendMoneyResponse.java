package com.yeargun.bankingapp.transaction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendMoneyResponse {
    private String fromCurrency;
    private String receiverCurrency;

    private float sendedAmount;
    private float sendedCurrencyValue;

    private float receivedAmount;
    private float receivedCurrencyValue;

    private String fromIBAN;
    private String receiverIBAN;
}
