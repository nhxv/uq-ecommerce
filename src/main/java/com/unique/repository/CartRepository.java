package com.unique.repository;

import com.unique.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByAccount_Email(String email);
}
