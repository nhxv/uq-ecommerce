package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Cart;
import com.unique.repository.AccountRepository;
import com.unique.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class CartController {
    private CartRepository cartRepository;

    @Autowired
    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @GetMapping("/cart/{accountEmail}")
    public ResponseEntity<Cart> getCart(@PathVariable String accountEmail) {
        Cart cart = cartRepository.findByAccount_Email(accountEmail);
        return ResponseEntity.ok().body(cart);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @PostMapping("/cart")
    public Cart createCart(@Valid @RequestBody Cart cart) {
        return cartRepository.save(cart);
    }
}
