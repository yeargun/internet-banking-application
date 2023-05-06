package com.yeargun.questionservice.account;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AccountService {

    private final JdbcTemplate jdbcTemplate;

    public AccountService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllAccounts() {
        String sql = "SELECT * FROM Accountt";
        return jdbcTemplate.queryForList(sql);
    }
}
