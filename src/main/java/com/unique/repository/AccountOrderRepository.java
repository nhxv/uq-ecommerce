package com.unique.repository;

import com.unique.model.AccountOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountOrderRepository extends JpaRepository<AccountOrder, Long> {
    Page<AccountOrder> findByAccountId(long id, Pageable pageable);
}
