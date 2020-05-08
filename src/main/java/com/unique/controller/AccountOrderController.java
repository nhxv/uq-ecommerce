package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.AccountOrder;
import com.unique.repository.AccountOrderRepository;
import com.unique.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class AccountOrderController {
    private AccountOrderRepository accountOrderRepository;

    @Autowired
    public AccountOrderController(AccountOrderRepository accountOrderRepository) {
        this.accountOrderRepository = accountOrderRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/account-orders/pageable")
    public Page<AccountOrder> getAllAccountOrders(@RequestParam(name = "page", defaultValue = "0") String pageParam,
                                                  @RequestParam(name = "size", defaultValue = "5") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        return this.accountOrderRepository.findAll(pageable);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @GetMapping("/account-orders/{id}")
    public ResponseEntity<AccountOrder> getAccountOrderById(@PathVariable long id) throws ResourceNotFoundException {
        AccountOrder accountOrder = this.accountOrderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: " + id));
        return ResponseEntity.ok().body(accountOrder);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @GetMapping("/account-orders/findByAccountId")
    public Page<AccountOrder> getAccountOrdersByAccountId(@RequestParam("page") String pageParam,
                                                          @RequestParam("size") String sizeParam,
                                                          @RequestParam("id") long id) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        Page<AccountOrder> accountOrders = this.accountOrderRepository.findByAccountId(id, pageable);
        return accountOrders;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @PostMapping("/account-orders")
    public AccountOrder addAccountOrder(@Valid @RequestBody AccountOrder accountOrder) {
        return this.accountOrderRepository.save(accountOrder);
    }

    @PutMapping("/account-orders/{id}")
    public ResponseEntity<AccountOrder> updateAccountOrder(@PathVariable(value = "id") long id,
                                                           @Valid @RequestBody AccountOrder accountOrderUpdate) throws ResourceNotFoundException {
        AccountOrder accountOrder = this.accountOrderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: " + id));
        accountOrder.setStatus(accountOrderUpdate.getStatus());
        return ResponseEntity.ok(this.accountOrderRepository.save(accountOrder));
    }
}
