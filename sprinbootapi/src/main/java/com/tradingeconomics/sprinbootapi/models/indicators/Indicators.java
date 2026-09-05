package com.tradingeconomics.sprinbootapi.models.indicators;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Indicators {

    @JsonProperty("Category")
    private String category;

    @JsonProperty("CategoryGroup")
    private String categoryGroup;
}
