package com.tradingeconomics.sprinbootapi.services.HistoricalService;


import com.tradingeconomics.sprinbootapi.models.historical.Historical;
import org.springframework.stereotype.Service;

import java.util.List;


public interface HistoricalService {




     List<Historical> handleRequest(String url) throws Exception;

}
