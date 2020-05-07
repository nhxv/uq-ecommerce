package com.unique.service;

import com.unique.exception.ItemExistException;
import com.unique.model.Account;
import com.unique.model.AccountDto;

public interface AccountService {
    Account save(AccountDto user) throws ItemExistException;
    Account findOne(String username);
}
