package com.unique.repository;

import com.unique.model.Account;
import com.unique.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByEmail(String email);
    Page<Account> findByRolesIn(Collection<Role> roles, Pageable pageable);
}
