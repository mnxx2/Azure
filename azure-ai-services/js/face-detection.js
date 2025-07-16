const axios = require("axios");
const fs = require("fs");
require("dotenv").config({ quiet: true });

const endpoint = process.env.FACE_ENDPOINT;
const apikey = process.env.FACE_APIKEY;

// 분석할 이미지의 파일 경로 (로컬 파일 시스템에서)
// mac의 다운로드/강의자료/azure-ai-services에 있을 때
const imagePath = "../datas/images/store-camera-1.jpg";

// 이미지 파일을 읽어서 바이너리 데이터로 준비
const imageBuffer = fs.readFileSync(imagePath);

// face api 옵션 설정
const options = {
  method: "POST",
  url: endpoint,
  params: {
    returnFaceLandmarks: true,
    returnFaceAttributes: "glasses,accessories,blur,exposure,noise",
  },
  headers: {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": apikey,
  },
  data: imageBuffer,
};

// face api 호출
// axios(options)

async function faceDetection() {
  try {
    const response = await axios(options);

    const datas = response.data;

    datas.forEach((data) => {
      console.log(data.faceRectangle);
      console.log(data.faceAttributes);
    });
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

faceDetection();
