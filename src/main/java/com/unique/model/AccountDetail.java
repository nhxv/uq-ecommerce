package com.unique.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "account_detail")
public class AccountDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @OneToMany
    @JoinColumn(name = "account_detail_id")
    private List<AccountOrder> accountOrders;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Column
    private int age;

    @Column
    private String cmnd;

    @Column
    private BigDecimal salary;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCmnd() {
        return cmnd;
    }

    public void setCmnd(String cmnd) {
        this.cmnd = cmnd;
    }

    public List<AccountOrder> getAccountOrders() {
        return accountOrders;
    }

    public void setAccountOrders(List<AccountOrder> accountOrders) {
        this.accountOrders = accountOrders;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
