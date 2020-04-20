package com.unique.controller;

import com.unique.config.JwtTokenUtil;
import com.unique.model.Account;
import com.unique.model.ApiResponse;
import com.unique.model.AuthToken;
import com.unique.model.AccountLogin;
import com.unique.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;
    private AccountService accountService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, AccountService accountService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.accountService = accountService;
    }

    @PostMapping(value = "/login")
    public ApiResponse<AuthToken> getToken(@RequestBody AccountLogin accountLogin) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        accountLogin.getEmail(),
                        accountLogin.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Account account = accountService.findOne(accountLogin.getEmail());
        final String token = jwtTokenUtil.generateToken(authentication);
        return new ApiResponse<>(200, "success", new AuthToken(token, account.getRoles()));
    }
}

