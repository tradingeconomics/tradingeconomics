package com.tradingeconomics.sprinbootapi.controllers;


import com.tradingeconomics.sprinbootapi.models.indicators.Indicators;
import com.tradingeconomics.sprinbootapi.services.IndicatorsService.IndicatorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin
public class IndicatorsController {

    @Autowired
    private IndicatorsService indicatorsService;


    @GetMapping(value = "allIndicators", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchIndicators() throws Exception{

        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in fetchIndicator method in indicatorsController");

        List<Indicators> indicatorsResponse = indicatorsService.handleRequest();



        return ResponseEntity.ok(indicatorsResponse);
    }


}
