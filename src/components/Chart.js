import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const Chart = (props) => {
  const [chartData, setChartData] = useState({});
  const [id] = useState(props.id);
  const chart = () => {
    let time = [];
    let price = [];
    let priceSmaller = [];
    let timeSmaller = [];
    let timeSmallerAndConverted = [];
    let whichCoin = id;

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart?vs_currency=usd&days=100`
      )
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.prices) {
          time.push(dataObj[0]);
          price.push(dataObj[1]);
        }
        console.log(price);
        for (var i = 0; i < price.length; i = i + 1) {
          priceSmaller.push(price[i]);
        }
        for (var i = 0; i < time.length; i = i + 1) {
          timeSmaller.push(time[i]);
        }
        for (var i = 0; i < timeSmaller.length; i++) {
          timeSmallerAndConverted.push(moment(timeSmaller[i]).format("ll"));
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
  };

  useEffect(() => {
    chart(props);
  }, [props]);

  return (
    <tr>
      <td></td>

      <td>
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
                  ticks: {
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default Chart;
