import tradingEconomics from "tradingeconomics";
import cfg from "../config.js";
import $ from "jquery";
import "./style.scss";

tradingEconomics.login(cfg.key);
tradingEconomics.getIndicatorData(indicator='CO2 Emissions').then(
    (data) => {
        // Sort the data set
        data.sort(function(a, b) {
            return a["LatestValue"] - b["LatestValue"];
        });

        // Select Table
        var table = $(".data-table");

        // Add top fields
        var titleTr = $("<tr class=\"title-row\"></tr>")
        table.append(titleTr);
        titleTr.append($("<td>Country</td>"))
        titleTr.append($("<td>Latest Value</td>"));
        titleTr.append($("<td>Last Updated</td>"));
            
        var i, currentData, tr, latestDateText, count = data.length;
        for (i = 0; i < count; i++) {
            currentData = data[i];
            
            // New Row
            tr = $("<tr></tr>");
            tr.append($("<td>" + currentData["Country"] +"</td>"))
            tr.append($("<td>" + currentData["LatestValue"] + " " + currentData["Unit"] + "</td>"))
            
            latestDateText = new Date(currentData["LatestValueDate"]).toLocaleDateString("en-US");
            tr.append($("<td>" + latestDateText + "</td>"))

            // Add the row to the table
            table.append(tr);
        }
    }
);