package com.unique.service.impl;

import com.unique.model.Account;
import com.unique.model.Role;
import com.unique.model.AccountDto;
import com.unique.repository.AccountRepository;
import com.unique.repository.RoleRepository;
import com.unique.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service(value = "userService")
public class AccountServiceImpl implements UserDetailsService, AccountService {
    private AccountRepository accountRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository, BCryptPasswordEncoder bcryptEncoder) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    // use email as username
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account accountDto = accountRepository.findByEmail(email);
        if (accountDto == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(accountDto.getEmail(), accountDto.getPassword(), getAuthority(accountDto));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Account accountDto) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        accountDto.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    @Override
    public Account findOne(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public Account save(AccountDto accountDto) {
        Account newAccount = new Account();
        // auto set role to CUSTOMER
        Role accountRole = this.roleRepository.findById(Long.valueOf(3)).get();
        Set<Role> roles = new HashSet<>();
        roles.add(accountRole);
        newAccount.setEmail(accountDto.getEmail());
        newAccount.setPassword(bcryptEncoder.encode(accountDto.getPassword()));
        newAccount.setName(accountDto.getName());
        newAccount.setAddress(accountDto.getAddress());
        newAccount.setPhone(accountDto.getPhone());
        newAccount.setRoles(roles);
        return accountRepository.save(newAccount);
    }
}

