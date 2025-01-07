<template>
  <div class="container">
    <p>
      I have used the apis in various ways for data visualization. The page can
      be accessed by the links in the header
    </p>
    <br />
    <p>
      Countries Available are: Mexico, Sweden, Thailand and New Zealand ( Only
      countries available with the free api key )
    </p>
    <br />
    <div>
      Indicators API Page: Here i have implemented historical indicator and
      credit ratings.
      <div style="margin-left: 2rem">Historical Indicator</div>
      <ul style="margin-left: 4rem">
        <li>
          Choose Country and Choose Indicator (gdp or population) and load data
          on chart
        </li>
        <li>
          Choose again different country or inidicator to plot the new data on
          the same chart
        </li>
        <li>Button to remove specific data from chart</li>
        <li>Info shown on hover</li>
      </ul>
      <div style="margin-left: 2rem">Credit Ratings</div>
      <ul style="margin-left: 4rem">
        <li>Show credit ratings data of countries in table form</li>
      </ul>
    </div>
    <br />
    <div>
      Economic Calendar API Page: Here i have implemented Economic Calendar by
      Country.
      <div style="margin-left: 2rem">Economic Calendar</div>
      <ul style="margin-left: 4rem">
        <li>Show Economic Calender data of country selected</li>
      </ul>
    </div>
  </div>
</template>
