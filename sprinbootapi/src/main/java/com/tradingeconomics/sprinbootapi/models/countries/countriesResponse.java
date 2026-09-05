package com.tradingeconomics.sprinbootapi.models.countries;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class countriesResponse {


    private String country;
    private String category;
    private String title;
    private LocalDateTime latestValueDate;
    private double latestValue;
    private String source;
    private String sourceURL;
    private String unit;
    private String url;
    private String categoryGroup;
    private String adjustment;
    private String frequency;
    private String historicalDataSymbol;
    private LocalDateTime createDate;
    private LocalDateTime firstValueDate;
    private double previousValue;
    private LocalDateTime previousValueDate;

}
