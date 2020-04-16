package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Cart;
import com.unique.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<Cart> getProduct(@PathVariable long cartId) throws ResourceNotFoundException {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart not found for this id: " + cartId));
        return ResponseEntity.ok().body(cart);
    }

    @PostMapping("/cart")
    public Cart createCart(@Valid @RequestBody Cart cart) {
        return cartRepository.save(cart);
    }

    @PutMapping("/cart/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable(value="id") Long cartId, @Valid @RequestBody Cart cartUpdate) throws ResourceNotFoundException {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart not found for this id: " + cartId));
        cart.setProducts(cart.getProducts());
        return ResponseEntity.ok(cartRepository.save(cart));
    }
}