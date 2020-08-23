import axios from "axios";

export function MoonPayCheckWhichCoins() {
  axios
    .get(
      `https://api.moonpay.io/v3/currencies?apiKey=pk_test_XYlfn9ISmwfjwReteBLpiN1TdSDV7Pw7`
    )
    .then((res) => {
      console.log(res);
      let allNames = [];
      for (const dataObj of res.data.name) {
        allNames.push(dataObj);
      }
      console.log(allNames);
      return allNames;
    })
    .catch((err) => {
      console.log(err);
    });
}
