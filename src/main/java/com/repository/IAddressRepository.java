package com.repository;

import com.model.Address;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAddressRepository extends PagingAndSortingRepository<Address, Long> {
}
