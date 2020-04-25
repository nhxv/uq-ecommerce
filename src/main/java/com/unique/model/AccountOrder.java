package com.unique.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "account_order")
public class AccountOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @OneToMany
    @JoinColumn(name = "account_order_id")
    private List<ProductOrder> productOrder;

    @Column(name="date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column
    private String status;

    public AccountOrder() {}

    public AccountOrder(long id, List<ProductOrder> productOrder, Date dateCreated) {
        this.id = id;
        this.productOrder = productOrder;
        this.dateCreated = dateCreated;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<ProductOrder> getProductOrder() {
        return productOrder;
    }

    public void setProductOrder(List<ProductOrder> productOrder) {
        this.productOrder = productOrder;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
