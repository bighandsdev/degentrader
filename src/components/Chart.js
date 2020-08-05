import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);

  const chart = () => {
    let time = [];
    let price = [];
    let priceSmaller = [];
    let timeSmaller = [];
    let timeSmallerAndConverted = [];
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=3"
      )
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.prices) {
          time.push(parseInt(dataObj[[0]]));
          price.push(parseInt(dataObj[[1]]));
        }

        for (var i = 0; i < price.length; i = i + 10) {
          priceSmaller.push(price[i]);
        }
        for (var i = 0; i < time.length; i = i + 10) {
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
              label: "Price",
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
            tooltips: {
              mode: "x-axis",
            },
            responsive: true,
            title: { text: "THICCNESS SCALE", display: false },
            elements: {
              line: {
                tension: 0,
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
