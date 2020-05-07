package com.unique.repository;

import com.unique.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
