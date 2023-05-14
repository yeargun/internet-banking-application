package com.yeargun.bankingapp.account;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AccountService {

    private final JdbcTemplate jdbcTemplate;

    public AccountService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllAccounts(String personId) {
        String sql = "SELECT a.*, c.symbol " +
                "FROM Accountt a " +
                "JOIN Currency c ON a.currency_id = c.id " +
                "WHERE a.person_id = (SELECT id FROM Person WHERE id_number = ?)";

        return jdbcTemplate.queryForList(sql, personId);
    }


    public Boolean createNewAccount(CreateAccountRequest request, String personId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("insert_account");

        jdbcCall.execute(100, personId, request.getCurrencySymbol(), "Gold Acc");
        return true;
    }
}
