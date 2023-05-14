package com.yeargun.bankingapp.currency;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CurrencyService {

    private final JdbcTemplate jdbcTemplate;

    public CurrencyService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Map<String, Object>> getAllCurrencies() {
        String sql = "SELECT id,selling_value, buying_value, symbol FROM currency";
        return jdbcTemplate.queryForList(sql);
    }


}
