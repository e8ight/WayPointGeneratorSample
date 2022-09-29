const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

const data1 = [
  [-48.5, 0, -82],
  [-20.7, 0, -86.2],
  [-12, 0, -86.85],
  [-4.65, 0, -80.8],
  [-3.4, 0, -73],
  [-3.4, 0, -73],
  [-3.4, 0, -73],
  [-3.4, 0, -73],
  [-3.4, 0, -73],
  [2.4, 0, -34.4],
  [5.9, 0, -14],
  [7.2, 0, -7.3],
  [0.2, 0, 1.55],
  [-6.5, 0, 2],
  [-30, 0, 5.25],
  [-52.8, 0, 8.6],
  [-67.45, 0, 10.95],
  [-74.2, 0, 11.1],
  [-82.02, 0, 5.3],
  [-82.85, 0, -0.6],
  [-84.85, 0, -15.65],
  [-88.55, 0, -38.8],
  [-91.7, 0, -61.25],
  [-92.4, 0, -67.85],
  [-86.2, 0, -77.2],
  [-78.8, 0, -77.55],
  [-63.55, 0, -79.85],
];

// const data2 = [
//   [-6.5, 0, 2],
//   [-30, 0, 5.25],
//   [-52.8, 0, 8.6],
//   [-67.45, 0, 10.95],
//   [-74.2, 0, 11.1],
//   [-74.2, 0, 11.1],
//   [-74.2, 0, 11.1],
//   [-74.2, 0, 11.1],
//   [-74.2, 0, 11.1],
//   [-82.02, 0, 5.3],
//   [-82.85, 0, -0.6],
//   [-84.85, 0, -15.65],
//   [-88.55, 0, -38.8],
//   [-91.7, 0, -61.25],
//   [-92.4, 0, -67.85],
//   [-86.2, 0, -77.2],
//   [-78.8, 0, -77.55],
//   [-63.55, 0, -79.85],
//   [-48.5, 0, -82, 1],
//   [-20.7, 0, -86.2],
//   [-12, 0, -86.85],
//   [-4.65, 0, -80.8],
//   [-3.4, 0, -73],
//   [2.4, 0, -34.4],
//   [5.9, 0, -14],
//   [7.2, 0, -7.3],
//   [0.2, 0, 1.55],
// ];

const app = express();
app.use(cors());

const port = 3000;

const dataList = [data1];
let indexWrapper = new Array(dataList.length).fill(0);
let types = ["car", "truck", "bus", "car", "car", "bus", "car"];

let responseJson;

app.get("/getWayPoint", (req, res) => {
  res.json(responseJson);
});

setInterval(() => {
  responseJson = {
    data: [],
  };
  dataList.forEach((data, idx) => {
    const result = {
      type: types[idx],
      uuid: v4(),
    };

    result.x = data[indexWrapper[idx]][0];
    result.y = data[indexWrapper[idx]][1];
    result.z = data[indexWrapper[idx]][2];

    responseJson.data.push(result);
  });

  console.log(responseJson);

  dataList.forEach((data, idx) => {
    indexWrapper[idx] += 1;
    if (indexWrapper[idx] >= data.length) indexWrapper[idx] = 0;
  });
}, 1000);

app.listen(port, () => {
  console.log(`Eample app listening on port ${port}`);
});
