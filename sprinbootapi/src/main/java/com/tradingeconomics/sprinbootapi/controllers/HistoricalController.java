package com.tradingeconomics.sprinbootapi.controllers;

import com.tradingeconomics.sprinbootapi.models.historical.Historical;
import com.tradingeconomics.sprinbootapi.services.HistoricalService.HistoricalService;
import com.tradingeconomics.sprinbootapi.services.HistoricalService.HistoricalServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin
public class HistoricalController {

    @Autowired
    HistoricalService historicalService;

    @Value("${app.secret.key}")
    String secretKey;


    @GetMapping(value = "historicalcategory", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getCategoryHistoricalDataForCountry(@RequestParam String country,
                                                          @RequestParam String indicator,
                                                          @RequestParam String startDate,
                                                          @RequestParam String endDate) throws Exception {


        if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
            throw new IllegalArgumentException("Invalid date format. Please use the format yyyy-MM-dd.");
        }


        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in getCategoryHistoricalDataForCountry method in CountriesController");

        String url = String.format(
                "https://api.tradingeconomics.com/historical/country/%s/indicator/%s/%s/%s?c="+secretKey,
                country, indicator, startDate, endDate
        );

        List<Historical> historicalList = historicalService.handleRequest(url);


        return ResponseEntity.ok(historicalList);
    }




    private boolean isValidDateFormat(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        try {
            LocalDate.parse(date, formatter); // Try to parse the date
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}
