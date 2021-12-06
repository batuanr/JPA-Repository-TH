package com.controller;

import com.model.Address;
import com.service.address.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
public class AddressRestController {
    @Autowired
    IAddressService addressService;

    @GetMapping
    public ResponseEntity<Iterable<Address>> findAll(){
        return new ResponseEntity<>(addressService.findAll(), HttpStatus.OK);
    }
    
}
