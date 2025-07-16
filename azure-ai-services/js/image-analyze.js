const axios = require("axios");
const fs = require("fs");
require("dotenv").config({ quiet: true });

const endpoint = process.env.IMAGE_ANALYZE_ENDPOINT;
const apikey = process.env.IMAGE_ANALYZE_APIKEY;

// images 폴더를 js 폴더 내로 복사해옴
const imagePath = "./images/sunglass.jpg";
const imageBuffer = fs.readFileSync(imagePath);

const options = {
  method: "POST",
  url: endpoint,
  params: {
    visualFeatures: "description,tags,faces,adult,color",
    details: "landmarks",
  },
  headers: {
    "Ocp-Apim-Subscription-Key": apikey,
    "Content-Type": "image/jpeg",
  },
  data: imageBuffer,
};

axios(options)
  .then((response) => {
    console.log(response.data.description.captions[0].text);
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

// async function imageAnaylze() {
//   try {
//     const response = await axios.post(endpoint, imageBuffer, {
//       headers: {
//         "Ocp-Apim-Subscription-Key": apikey,
//         "Content-Type": "image/jpeg",
//       },
//       params: {
//         visualFeatures: "description,tags,faces,adult,color",
//         details: "landmarks",
//       },
//     });

//     const datas = response.data;
//     console.log(datas);
//     console.log(response.data.description.captions[0].text);
//   } catch (error) {
//     console.log("에러 발생 : ", error);
//   }
// }

// imageAnaylze();
