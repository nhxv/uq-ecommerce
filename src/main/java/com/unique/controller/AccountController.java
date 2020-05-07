package com.unique.controller;

import com.unique.exception.ItemExistException;
import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Account;
import com.unique.model.AccountDto;
import com.unique.model.Role;
import com.unique.repository.AccountRepository;
import com.unique.repository.RoleRepository;
import com.unique.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class    AccountController {
    private AccountRepository accountRepository;
    private AccountService accountService;
    private RoleRepository roleRepository;

    @Autowired
    public AccountController(AccountRepository accountRepository, AccountService accountService, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.accountService = accountService;
        this.roleRepository = roleRepository;
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
    @GetMapping("/accounts/profile/{email}")
    public ResponseEntity<Account> getAccountByEmail(@PathVariable String email) {
        Account account = accountRepository.findByEmail(email);
        return ResponseEntity.ok().body(account);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/accounts/searchRole")
    public Page<Account> getStaffs(@RequestParam("role") String roleName,
                                   @RequestParam(name = "page") String pageParam,
                                   @RequestParam(name = "size") String sizeParam) {
        Role role = this.roleRepository.findByName(roleName);
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size);
        Page<Account> accounts = this.accountRepository.findByRolesIn(Arrays.asList(role), pageable);
        return accounts;
    }


    @PostMapping("/register")
    public Account createAccount(@Valid @RequestBody AccountDto user) throws ItemExistException {
        return accountService.save(user);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF', 'ADMIN')")
    @PutMapping("/accounts/{accountId}")
    public ResponseEntity<Account> updateAccount(@PathVariable long accountId, @Valid @RequestBody Account accountUpdate) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new ResourceNotFoundException("User not found for this id: " + accountId));
        account.setName(accountUpdate.getName());
        account.setAddress(accountUpdate.getAddress());
        account.setPhone(accountUpdate.getPhone());
        account.setAge(accountUpdate.getAge());
        account.setCmnd(accountUpdate.getCmnd());
        account.setAccountOrders(accountUpdate.getAccountOrders());
        return ResponseEntity.ok(accountRepository.save(account));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/accounts/role/{accountId}")
    public ResponseEntity<Account> updateRole(@PathVariable long accountId, @Valid @RequestBody Account accountUpdate) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new ResourceNotFoundException("User not found for this id: " + accountId));
        Set<Role> roles = account.getRoles();
        Role staffRole = this.roleRepository.findById(Long.valueOf(2)).get();
        if (!roles.contains(staffRole)) {
            // set staff
            account.setSalary(accountUpdate.getSalary());
            roles.add(staffRole);
        } else {
            roles.remove(staffRole);
        }
        account.setRoles(roles);
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
