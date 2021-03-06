package com.service.customer;

import com.model.Address;
import com.model.Customer;
import com.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICustomerService extends IGeneralService<Customer> {
    Page<Customer> findAll(Pageable pageable);
    Page<Customer> findAllByFirstName(String firstName, Pageable pageable);
    Page<Customer> findAllByAddress(Address address, Pageable pageable);
    Iterable<Customer> findAllByAddress(Address address);
}
