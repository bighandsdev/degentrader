import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const Chart = (props) => {
  const [chartData, setChartData] = useState({});
  const [id] = useState(props.id);
  const [currency] = useState(props.currency);
  const [symbol] = useState(props.currencysymbols);
  const [days] = useState(props.days);
  const [redraw, setRedraw] = useState({});
  const chart = (props) => {
    let daysChart = props.days;
    let currency = props.currency;
    let symbol = props.currencysymbols;
    let time = [];
    let price = [];
    let priceSmaller = [];
    let volume = [];
    let volumeSmaller = [];
    let timeSmaller = [];
    let timeSmallerAndConverted = [];
    let whichCoin = id;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart?vs_currency=${currency}&days=${daysChart}`
      )
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.prices) {
          time.push(dataObj[0]);
          price.push(dataObj[1]);
        }
        console.log(price);
        for (var i = 0; i < price.length; i = i + 1) {
          priceSmaller.push(Math.round(price[i] * 100) / 100);
        }
        for (var i = 0; i < time.length; i++) {
          timeSmaller.push(time[i]);
        }
        for (var i = 0; i < timeSmaller.length; i++) {
          timeSmallerAndConverted.push(moment(timeSmaller[i]).format("l"));
        }

        setChartData({
          labels: timeSmallerAndConverted,
          datasets: [
            {
              label: currency.toUpperCase(),
              data: priceSmaller,
              type: "line",
              backgroundColor: "rgb(245, 167, 167)",
              backgroundColor: "rgb(245, 167, 167)",
              backgroundColor: "rgb(245, 167, 167)",
              backgroundColor: "rgb(245, 167, 167)",
              backgroundColor: "rgb(245, 167, 167)",

              borderWidth: 4,
            },
          ],
        });

        setRedraw(true);
        setRedraw(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart(props);
  }, [props]);

  return (
    <div>
      <Line
        redraw={redraw}
        data={chartData}
        options={{
          legend: {
            display: false,
          },
          tooltips: {
            displayColors: false,
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
                  callback: function (value) {
                    return props.currencysymbols + value;
                  },
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
    </div>
  );
};

export default Chart;
