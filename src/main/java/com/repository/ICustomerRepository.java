package com.repository;

import com.model.Address;
import com.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends PagingAndSortingRepository<Customer, Long> {
    Page<Customer> findAllByFirstNameContaining(String firstName, Pageable pageable);
    Page<Customer> findAllByAddress(Address address, Pageable pageable);
    Iterable<Customer> findAllByAddress(Address address);
}
