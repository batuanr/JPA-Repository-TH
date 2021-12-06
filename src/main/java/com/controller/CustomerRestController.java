package com.controller;

import com.model.Address;
import com.model.Customer;
import com.service.address.IAddressService;
import com.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerRestController {

    @Autowired
    ICustomerService customerService;

    @Autowired
    IAddressService addressService;

    @GetMapping
    public ResponseEntity<Iterable<Customer>> findAll(){
        return new ResponseEntity<>(customerService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Customer> findCustomerById(@PathVariable Long id) {
        Optional<Customer> customerOptional = customerService.findById(id);
        if (!customerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customerOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Customer> saveCustomer(@RequestBody Customer customer) {
        customerService.save(customer);
        return new ResponseEntity<>( HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        Optional<Customer> customerOptional = customerService.findById(id);
        if (!customerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        customer.setId(customerOptional.get().getId());
        customerService.save(customer);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Customer> deleteCustomer(@PathVariable Long id) {
        Optional<Customer> customerOptional = customerService.findById(id);
        if (!customerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        customerService.remove(id);
        return new ResponseEntity<>(customerOptional.get(), HttpStatus.NO_CONTENT);
    }
    @GetMapping("/findByAddress/{id}")
    public ResponseEntity<Iterable<Customer>> findCustomerByAddress(@PathVariable Long id, Pageable pageable){
        Optional<Address> address = addressService.findById(id);

        return new ResponseEntity<>(customerService.findAllByAddress(address.get()) ,HttpStatus.OK);
    }
    @GetMapping("/findOne/{id}")
    public ResponseEntity<Customer> findOne(@PathVariable Long id){
        return new ResponseEntity<>(customerService.findById(id).get(), HttpStatus.OK);
    }
}
