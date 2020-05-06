package com.unique.service;

import com.unique.exception.EmailExistException;
import com.unique.model.Account;
import com.unique.model.AccountDto;

import java.util.List;

public interface AccountService {
    Account save(AccountDto user) throws EmailExistException;
    Account findOne(String username);
}
