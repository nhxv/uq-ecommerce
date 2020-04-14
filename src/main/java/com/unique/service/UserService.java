package com.unique.service;

import com.unique.model.UserDto;
import com.unique.model.User;

import java.util.List;

public interface UserService {
    User save(UserDto user);
    List<User> findAll();
    void delete(long id);
    User findOne(String username);
    User findById(Long id);
}
