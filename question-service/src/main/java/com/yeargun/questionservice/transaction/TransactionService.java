package com.yeargun.questionservice.transaction;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class TransactionService {
    private final JdbcTemplate jdbcTemplate;

    public TransactionService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllAccounts() {
        String sql = "SELECT * FROM Accountt";
        return jdbcTemplate.queryForList(sql);
    }
}
