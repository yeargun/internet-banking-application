package com.yeargun.bankingapp.transaction;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TransactionService {
    private final JdbcTemplate jdbcTemplate;

    public TransactionService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllTransactions(String personId) {
        String sql = "SELECT t.* FROM Transactionn t " +
                        "JOIN Accountt a ON t.sender_iban = a.IBAN OR t.reciever_IBAN = a.IBAN " +
                        "WHERE a.person_id = (SELECT id from Person WHERE id_number = ?)" +
                        "ORDER BY t.ts1 DESC";
        return jdbcTemplate.queryForList(sql, personId);
    }


    public SendMoneyResponse sendMoney(SendMoneyRequest request, String personId) {
        //check if fromIban is loggedInPerson's account

        if(request.getFromIBAN().equals(request.getToIBAN())){
            throw new SameIBANException("Can't transfer money | fromiban and toiban are same");
        }


        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("transferMoney");

        Map<String, Object> dbExecResponse = jdbcCall.execute(request.getFromIBAN(), request.getToIBAN(), request.getAmount(), request.getDescription());


        String sql;
        sql = "SELECT c.symbol from Currency c join accountt a on c.id = a.currency_id " +
                "WHERE a.IBAN = ?";
        String fromCurrency = jdbcTemplate.queryForObject(sql, String.class, request.getFromIBAN());
        String receivedCurrency = jdbcTemplate.queryForObject(sql, String.class, request.getToIBAN());

        sql = "SELECT c.buying_value from Currency c join accountt a on c.id = a.currency_id " +
                "WHERE a.IBAN = ?";
        float sendedCurrencyValue = jdbcTemplate.queryForObject(sql, Float.class , request.getFromIBAN());

        float receivedCurrencyValue = jdbcTemplate.queryForObject(sql, Float.class , request.getToIBAN());

        float receivedAmount = request.getAmount() * sendedCurrencyValue / receivedCurrencyValue;
        SendMoneyResponse res = SendMoneyResponse.builder()
                .fromIBAN(request.getFromIBAN())
                .receiverIBAN(request.getToIBAN())

                .sendedAmount(request.getAmount())
                .fromCurrency(fromCurrency)
                .sendedCurrencyValue(sendedCurrencyValue)

                .receivedAmount(receivedAmount)
                .receiverCurrency(receivedCurrency)
                .receivedCurrencyValue(receivedCurrencyValue)

                .build();
        return res;
    }
}
