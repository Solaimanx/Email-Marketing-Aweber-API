const axios = require("axios");
const FormData = require("form-data");

const Tag = async (tagName, email) => {
  const data = new FormData();
  data.append("contact[email]", email);

  if (tagName === "basic") {
    targetUrl =
      "https://www.english21days.co.il/thanks-and-redirect-to-course1639251946852";
  } else if (tagName === "pro") {
    targetUrl =
      "https://www.english21days.co.il/thanks-and-redirect-to-course1639164689473";
  } else if (tagName === "english") {
    targetUrl =
      "https://www.english21days.co.il/thanks-and-redirect-to-course1639253177305";
  }

  const config = {
    method: "post",
    url: targetUrl,
    headers: {
      Cookie:
        "_etison_sessions_dcs_v2=442d87f967035202ad65201ede50cd17; __cf_bm=HqNNtGTX4J6YjcsVXuXNhH9kHSDhR_FYZIVYd8LUPQc-1639253525-0-AQqncD6v5bKStvOrWT2besermK3T/jrQ2yTKp/iCxFNGVA3k+vo1u/zXVfg798QRGdr46JXzgbc7pTlmhLWqW0/Yx5SpSAAsWg8eUp4cDbXK",
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = { Tag };
