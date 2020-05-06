package com.unique.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class EmailExistException extends Exception {
    private static final long serialVersionUID = 1;
    public EmailExistException(String message) {super(message);}
}
