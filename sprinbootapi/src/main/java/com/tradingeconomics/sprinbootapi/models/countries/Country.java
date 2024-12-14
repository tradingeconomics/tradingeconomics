package com.tradingeconomics.sprinbootapi.models.countries;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Country {




     @JsonProperty("Country")
     private String country;
     @JsonProperty("Continent")
     private String continent;
     @JsonProperty("Group")
     private String group;
     @JsonProperty("ISO3")
     private String iso3;
     @JsonProperty("ISO2")
     private String iso2;

}
