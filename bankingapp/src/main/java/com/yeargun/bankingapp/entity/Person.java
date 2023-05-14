package com.yeargun.bankingapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;

@Component
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Person  {

    private String idNumber;
    private String name;
    private String surname;
    private String gender;
    private String email;
    private String password;
    private String phoneNumber;
    private String registeredBranchCode;




    public static Collection<? extends GrantedAuthority> getAuthorities(String username) {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
    }




//    public static final RowMapper<User> USER_ROW_MAPPER = (resultSet, rowNum) -> {
//        String username = resultSet.getString("username");
//        String password = resultSet.getString("password");
//        boolean enabled = resultSet.getBoolean("enabled");
//        return new User(username, password, authorities);
//    };

}
