import axios from "axios";

export function MoonPayCheckWhichCoins() {
  axios
    .get(
      `https://api.moonpay.io/v3/currencies?apiKey=pk_test_XYlfn9ISmwfjwReteBLpiN1TdSDV7Pw7`
    )
    .then((res) => {
      let allNames = [];
      for (let i = 0; res.data.length > i; i++) {
        allNames.push(res.data[i].name);
      }
      console.log(allNames);
      return allNames;
    })
    .catch((err) => {
      console.log(err);
    });
}
