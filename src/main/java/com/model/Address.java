package com.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Address {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(targetEntity = Customer.class)
    private List<Customer> customers;

    public Address() {
    }

    public Address(String name, List<Customer> customers) {
        this.name = name;
        this.customers = customers;
    }

    public Address(String name) {
        this.name = name;
    }

    public Address(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }
}
