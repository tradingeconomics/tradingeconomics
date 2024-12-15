package com.tradingeconomics.sprinbootapi.models.historical;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class Historical {

    @JsonProperty("Country")
    private String country;
    @JsonProperty("Category")
    private String category;

    @JsonProperty("DateTime")
    private String dateTime;

    @JsonProperty("Value")
    private String value;

    @JsonProperty("Frequency")
    private String frequency;

    @JsonProperty("HistoricalDataSymbol")
    private String historicalDataSymbol;

    @JsonProperty("LastUpdate")
    private Date lastUpdate;
}
