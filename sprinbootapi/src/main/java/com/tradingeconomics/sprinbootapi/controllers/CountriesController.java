package com.tradingeconomics.sprinbootapi.controllers;


import com.tradingeconomics.sprinbootapi.models.countries.Country;
import com.tradingeconomics.sprinbootapi.services.CountryService.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin
public class CountriesController {

        @Autowired
        private CountryService countryService;

        @GetMapping(value = "/allcountries", produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<?> getAllCountries() {

                System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in getAllCountries method in CountriesController");


                List<Country> countries =  countryService.handleRequest();

            return ResponseEntity.ok(countries);
        }


}
