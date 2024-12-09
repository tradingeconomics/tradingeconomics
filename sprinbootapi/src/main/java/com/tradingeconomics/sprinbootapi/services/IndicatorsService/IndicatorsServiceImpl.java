package com.tradingeconomics.sprinbootapi.services.IndicatorsService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.google.gson.Gson;
import com.tradingeconomics.sprinbootapi.models.indicators.IndicatorsResponse;
import com.tradingeconomics.sprinbootapi.models.indicators.TEIndicatorsRequest;
import com.tradingeconomics.sprinbootapi.models.indicators.TEIndicatorsResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

import java.io.Closeable;
import java.util.List;

@Slf4j
@Service
public class IndicatorsServiceImpl implements IndicatorsService{


//    @Autowired



//
    private final RestTemplate restTemplate;
//
    private final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory;


//    private final ObjectMapper mapper ;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    public IndicatorsServiceImpl(RestTemplateBuilder restTemplateBuilder, HttpComponentsClientHttpRequestFactory clientHttpRequestFactory) {
        this.restTemplate = restTemplateBuilder.build();
        this.clientHttpRequestFactory = clientHttpRequestFactory;
    }



    String url ="https://api.tradingeconomics.com/indicators?c=fcd064d5d09047b:jnf0d1gr3121vpb&calendar=1";



    @Override
    public IndicatorsResponse handleRequest() throws Exception {


        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in handleRequest Method");

        logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Now in handleRequest Method");

        TEIndicatorsRequest teIndicatorsRequest = new TEIndicatorsRequest();

        HttpHeaders httpHeaders = new HttpHeaders();

        ResponseEntity<String> stringResponseEntity;

//        httpHeaders.add();
        try {

            Type collectionType = new TypeToken<List<TEIndicatorsResponse>>(){}.getType();

            stringResponseEntity = restTemplate.getForEntity(url, String.class);

//


            List<TEIndicatorsResponse> teIndicatorsResponseList = (List<TEIndicatorsResponse>)new Gson().fromJson(stringResponseEntity.getBody(),collectionType);


//            log.info("TEIndicator response list response: {}", mapper.writeValueAsString(stringResponseEntity.getBody()));

            logger.info(stringResponseEntity.getBody()+">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        }
        catch (Exception e) {

            logger.info(e.getMessage(), e);
        }
        return null;
    }
}
