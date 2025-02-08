import React from "react";
import ReactApexChart from "react-apexcharts";
const SeriesChart = (data) => {
  const fetchData = data.data;
  console.log("data", fetchData);
  const toObj = Object.keys(fetchData);
  if (toObj.length === 0) {
    return;
  }
  // console.log(fetchData[toObj[0]].length);
  let dateArray = [];
  //
  const reArranged = [];
  for (let i = 0; i < toObj.length; i++) {
    const dataPush = [];
    // console.log(fetchData[toObj[i]]);

    console.log(fetchData[toObj[i]][0]["Value"], "newzero");
    for (let j = 0; j < fetchData[toObj[i]].length; j++) {
      dataPush.push(fetchData[toObj[i]][j]["Value"]);
      if (i === 0) {
        dateArray.push(fetchData[toObj[i]][j]["DateTime"]);
      }
    }
    reArranged.push({
      name: toObj[i],
      data: dataPush,
    });
  }
  // console.log(reArranged);
  // console.log(dateArray);
  // let dataArray = [];
  // for (let i = 0; i < fetchData.length - 1; i++) {
  //   dataArray.push(fetchData[i].Value);
  //   dateArray.push(fetchData[i].DateTime);
  // }
  // console.log(dataArray);
  const series = reArranged;
  const options = {
    title: {
      text: fetchData[toObj[0]][1].Category,
      align: "center"
    },
    xaxis: {
      categories: dateArray,
      type: "datetime",
      // tickAmount: 10,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "yyyy");
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#7443ff"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        type="line"
        series={series}
        options={options}
        width={"100%"}
      />
    </div>
  );
};

export default SeriesChart;
