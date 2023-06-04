package com.yeargun.bankingapp.auth;

import com.yeargun.bankingapp.config.JwtService;
import com.yeargun.bankingapp.entity.User;
import com.yeargun.bankingapp.repository.UserRepository;
import com.yeargun.bankingapp.token.Token;
import com.yeargun.bankingapp.token.TokenRepository;
import com.yeargun.bankingapp.token.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final JdbcTemplate jdbcTemplate;

    public LoginResponse register(RegisterRequest request) {
        savePerson(request);
        var user = User.builder()
                .name(request.getName())
                .username(request.getIdNumber())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return LoginResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void savePerson(RegisterRequest request){
//        String encodedPassword = passwordEncoder.encode(request.getPassword());
//        var person = Person.builder()
//                .idNumber(request.getIdNumber())
//                .name(request.getName())
//                .surname(request.getSurname())
//                .gender(request.getGender())
//                .email(request.getEmail())
//                .password(request.getPassword())
//                .phoneNumber(request.getPhoneNumber())
//                .registeredBranchCode(request.getRegisteredBranchCode())
//                .build();

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("insert_person");


        jdbcCall.execute(request.getIdNumber(), request.getName(), request.getSurname(),
                request.getGender(), request.getEmail(), request.getPassword(), request.getPhoneNumber(),
                request.getRegisteredBranchCode());



    }

    public LoginResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return LoginResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public List<Map<String, Object>> getAllBranchCodes() {
        String sql = "SELECT code FROM Branch";
        return jdbcTemplate.queryForList(sql);
    }
}
