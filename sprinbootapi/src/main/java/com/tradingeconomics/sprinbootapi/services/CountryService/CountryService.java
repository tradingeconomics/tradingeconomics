package com.tradingeconomics.sprinbootapi.services.CountryService;

import com.tradingeconomics.sprinbootapi.models.countries.Country;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CountryService {

     List<Country> handleRequest();

}
