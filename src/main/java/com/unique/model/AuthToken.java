package com.unique.model;

import java.util.Set;

public class AuthToken {

    private String token;
    private Set<Role> roles;

    public AuthToken(){}

    public AuthToken(String token, Set<Role> roles) {
        this.token = token;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
