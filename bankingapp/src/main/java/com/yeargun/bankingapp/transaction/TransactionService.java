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
                        "JOIN Accountt a ON t.sender_iban = a.IBAN " +
                        "WHERE a.person_id = (SELECT id from Person WHERE id_number = ?)";
        return jdbcTemplate.queryForList(sql, personId);
    }


    public String sendMoney(SendMoneyRequest request, String personId) {
        //check if fromIban is loggedInPerson's account

        if(request.getFromIBAN().equals(request.getToIBAN())){
            return "Can't transfer money | fromiban and toiban are same";
        }


        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("transferMoney");



        return jdbcCall.execute(request.getFromIBAN(), request.getToIBAN(), request.getAmount(), request.getDescription()).toString();
    }
}
