package com.yeargun.questionservice.transaction;

import jakarta.transaction.Transactional;
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

    public List<Map<String, Object>> getAllTransactions() {
        String sql = "SELECT * FROM transactionn";
        return jdbcTemplate.queryForList(sql);
    }


    @Transactional
    public String sendMoney(SendMoneyRequest request, String personId) {
        //check if fromIban is loggedInPerson's account

        if(request.getFromIBAN().equals(request.getToIBAN())){
            return "Can't transfer money | fromiban and toiban are same";
        }


        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("transferMoney");



        return jdbcCall.execute(request.getFromIBAN(), request.getToIBAN(), request.getAmount()).toString();
    }
}
