// 필요한 모듈 import
// endpoint, apikey, inputdata 설정
const axios = require("axios");
const endPoint = `https://mlws-hnzxt.koreacentral.inference.ml.azure.com/score`;
const apikey = `bike-rental-azure-key`;
const inputData = {
  input_data: {
    columns: [
      "day",
      "mnth",
      "year",
      "season",
      "holiday",
      "weekday",
      "workingday",
      "weathersit",
      "temp",
      "atemp",
      "hum",
      "windspeed",
    ],
    index: [0],
    data: [[14, 7, 2025, 2, 0, 1, 1, 2, 0.3, 0.3, 0.3, 0.3]],
  },
};

// postman에서 header와 authorization에 해당하는 옵션들
const options = {
  method: "POST",
  url: endPoint,
  headers: {
    Authorization: `Bearer ${apikey}`,
    // postman에서 숨겨진 헤더에 Content-Type 이라고 하이픈이 들어가는 key가 있기 때문에 따옴표로 묶어서 사용
    "Content-Type": "application/json",
  },
  data: inputData,
};

// axios는 promise를 반환하기 때문에 async/await 혹은 then,catch 사용
axios(options)
  .then((res) => {
    console.log("예측 결과", res.data);
  })
  .catch((error) => {
    console.log("오류 발생 : ", error);
  });

// async/await 사용
async function rentals() {
  try {
    const response = await axios(options);
    console.log("에측 결과 : ", response.data);
  } catch (error) {
    console.log("오류 발생 : ", error);
  }
}

rentals();
