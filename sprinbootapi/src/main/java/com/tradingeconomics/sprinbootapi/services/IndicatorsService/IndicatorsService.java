package com.tradingeconomics.sprinbootapi.services.IndicatorsService;

import com.tradingeconomics.sprinbootapi.models.indicators.Indicators;

import java.util.List;


public interface IndicatorsService {


    List<Indicators> handleRequest() throws Exception;
}
