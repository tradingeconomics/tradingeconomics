package com.tradingeconomics.sprinbootapi.services.IndicatorsService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tradingeconomics.sprinbootapi.models.indicators.TEIndicatorsRequest;
import com.tradingeconomics.sprinbootapi.models.indicators.Indicators;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class IndicatorsServiceImpl implements IndicatorsService{

    private final RestTemplate restTemplate;

    public IndicatorsServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }




    ResponseEntity<String> stringResponseEntity;

    String response;

    Indicators[] indicatorsArrayResponse;

    @Value("${app.secret.key}")
    private String secretKey;






    private final Logger logger = LoggerFactory.getLogger(this.getClass());

//    String url ="https://api.tradingeconomics.com/indicators?c=fcd064d5d09047b:jnf0d1gr3121vpb&calendar=1";





    @Override
    public List<Indicators> handleRequest() throws Exception {

//        indicatorsResponse = new IndicatorsResponse();

        String url ="https://api.tradingeconomics.com/indicators?c="+secretKey+"&calendar=1";

        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in handleRequest Method in IndicatorsServiceImpl Class");

        logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in handleRequest Method in IndicatorsServiceImpl Class");

        TEIndicatorsRequest teIndicatorsRequest = new TEIndicatorsRequest();

        HttpHeaders httpHeaders = new HttpHeaders();



        try {


            response = restTemplate.getForObject(url,String.class);


            indicatorsArrayResponse = new ObjectMapper().readValue(response, Indicators[].class);

            logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>> indicatorsArrayResponse : " + Arrays.asList(indicatorsArrayResponse));




        }
        catch(Exception e){

            logger.info("Error fetching Indicators "+e.getMessage());
        }

//
        return Arrays.asList(indicatorsArrayResponse);

    }
}
