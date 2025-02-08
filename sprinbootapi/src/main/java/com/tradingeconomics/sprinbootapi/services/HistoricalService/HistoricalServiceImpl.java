package com.tradingeconomics.sprinbootapi.services.HistoricalService;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.tradingeconomics.sprinbootapi.models.historical.Historical;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import java.util.Arrays;
import java.util.List;

@Service
public class HistoricalServiceImpl implements HistoricalService{

    public HistoricalServiceImpl(RestTemplateBuilder restTemplateBuilder){

        this.restTemplate = restTemplateBuilder.build();

    }

    RestTemplate restTemplate;

//    String url = "https://api.tradingeconomics.com/historical/country/mexico/indicator/population/2015-01-01/2020-12-31?c=fcd064d5d09047b:jnf0d1gr3121vpb";

    String response;

    Historical[] historicalResponseArray;


    private final Logger logger = LoggerFactory.getLogger(this.getClass());



    @Override
    public List<Historical> handleRequest(String url) throws Exception{


        logger.info("Now in handleRequest Method in HistoricalServiceImpl Class");

        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in handleRequest Method in HistoricalServiceImpl Class");

        logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in handleRequest Method in HistoricalServiceImpl Class");


            try{

                response = restTemplate.getForObject(url, String.class);

                historicalResponseArray = new ObjectMapper().readValue(response,Historical[].class);

                logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HistoricalResponseArray " + Arrays.asList(historicalResponseArray));



            }
            catch(Exception e){


                logger.info("Error fetching Indicators "+e.getMessage());
            }

        return Arrays.asList(historicalResponseArray);
    }



}
