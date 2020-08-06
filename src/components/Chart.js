import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const Chart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let time = [];
    let price = [];
    let priceSmaller = [];
    let timeSmaller = [];
    let timeSmallerAndConverted = [];
    let whichCoin = "ethereum";
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart?vs_currency=usd&days=100`
      )
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.prices) {
          time.push(parseInt(dataObj[[0]]));
          price.push(parseInt(dataObj[[1]]));
        }

        for (var i = 0; i < price.length; i = i + 1) {
          priceSmaller.push(price[i]);
        }
        for (var i = 0; i < time.length; i = i + 1) {
          timeSmaller.push(time[i]);
        }
        for (var i = 0; i < timeSmaller.length; i++) {
          timeSmallerAndConverted.push(
            moment(timeSmaller[i]).format("YYYY-MM-DD HH:mm")
          );
        }
        setChartData({
          labels: timeSmallerAndConverted,
          datasets: [
            {
              label: "USD",
              data: priceSmaller,
              backgroundColor: ["lightgreen"],
              backgroundColor: ["lightgreen"],
              backgroundColor: ["lightgreen"],
              backgroundColor: ["lightgreen"],
              backgroundColor: ["lightgreen"],
              backgroundColor: ["lightgreen"],
              backgroundColor: ["lightgreen"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(time, price);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <div>
        <Line
          data={chartData}
          options={{
            legend: {
              display: false,
            },
            tooltips: {
              mode: "x-axis",
            },
            responsive: true,
            title: { text: "THICCNESS SCALE", display: false },
            elements: {
              point: {
                radius: 0,
              },
              line: {
                tension: 0.05,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: false,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
