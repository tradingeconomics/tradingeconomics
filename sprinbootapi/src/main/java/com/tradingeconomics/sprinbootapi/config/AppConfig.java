package com.tradingeconomics.sprinbootapi.config;


import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
        return restTemplateBuilder.build();
    }

//    @Bean
//    public HttpComponentsClientHttpRequestFactory factory() {
//        return new HttpComponentsClientHttpRequestFactory();
//
//    }
}
