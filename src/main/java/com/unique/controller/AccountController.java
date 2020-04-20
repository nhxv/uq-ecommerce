package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Account;
import com.unique.model.AccountDto;
import com.unique.repository.AccountRepository;
import com.unique.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AccountController {
    private AccountRepository accountRepository;
    private AccountService accountService;

    @Autowired
    public AccountController(AccountRepository accountRepository, AccountService accountService) {
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/accounts")
    public List<Account> getAllUsers() {
        return accountRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF', 'ADMIN')")
    @GetMapping("/accounts/{accountId}")
    public ResponseEntity<Account> getAccount(@PathVariable long accountId) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new ResourceNotFoundException("User not found for this id: " + accountId));
        return ResponseEntity.ok().body(account);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF', 'ADMIN')")
    @GetMapping("/account/profile/{email}")
    public ResponseEntity<Account> getAccountByEmail(@PathVariable String email) {
        Account account = accountRepository.findByEmail(email);
        return ResponseEntity.ok().body(account);
    }

    @PostMapping("/register")
    public Account createAccount(@Valid @RequestBody AccountDto user) {
        return accountService.save(user);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF', 'ADMIN')")
    @PutMapping("/accounts/{accountId}")
    public ResponseEntity<Account> updateAccount(@PathVariable long accountId, @Valid @RequestBody Account accountUpdate) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new ResourceNotFoundException("User not found for this id: " + accountId));
        account.setName(accountUpdate.getName());
        account.setAddress(accountUpdate.getAddress());
        account.setPhone(accountUpdate.getPhone());
        return ResponseEntity.ok(accountRepository.save(account));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/accounts/{accountId}")
    public Map<String, Boolean> deleteAccount(@PathVariable long accountId) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new ResourceNotFoundException("User not found for this id: " + accountId));
        account.setRoles(null);
        accountRepository.delete(account);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
