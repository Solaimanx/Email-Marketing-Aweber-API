const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Token = mongoose.model("token");
const RemoveClickfunnelTag = require("../remove_ClickfunnelTag");
const Aweber = require("../remove_AweberTag");
const tradeRefreshToken = require("../utils/trade_refresh_token");
const schedule = require("node-schedule");

router.post("/webhook", (req, res) => {
  const proTag = "pro";
  const basicTag = "basic";
  const englishByTheWayTag = "english";
  const id = "61c63785bcb637c1cb9e6270";
  const { client_email, course_name } = req.body;

  if (course_name == "קונפידנס") {
    ///pro basic tag

    RemoveClickfunnelTag.Tag(basicTag, client_email);
    RemoveClickfunnelTag.Tag(proTag, client_email);

    const twomins = new Date().getTime() + 2 * 60 * 1000;
    const dateTwo = new Date(twomins);

    const fourmins = new Date().getTime() + 4 * 60 * 1000;
    const dateFour = new Date(fourmins);

    schedule.scheduleJob(dateTwo, function () {
      RemoveClickfunnelTag.Tag(basicTag, client_email);
      RemoveClickfunnelTag.Tag(proTag, client_email);
    });

    schedule.scheduleJob(dateFour, function () {
      RemoveClickfunnelTag.Tag(basicTag, client_email);
      RemoveClickfunnelTag.Tag(proTag, client_email);
    });

    //get old token
    Token.findById(id)
      .select("accessToken  -_id")
      .then(async (token) => {
        const { accessToken } = token;

        const newToken = await tradeRefreshToken.GetNewToken(accessToken);

        //update new token
        Token.findByIdAndUpdate(
          id,
          {
            $set: {
              accessToken: `${newToken}`,
            },
          },
          {
            new: true,
          },
          async (err, result) => {
            if (err) {
              console.log(err);
            }
            const { accessToken } = result;
            const tag = "buyer";
            const response = await Aweber.removeTag(
              client_email,
              accessToken,
              tag
            );
            if (response == 209) {
              return res.status(200).json({ message: "success" });
            } else {
              return res.status(200).json({ message: "failed" });
            }
          }
        );
      })
      .catch((err) => {
        console.log("get access token Error: " + err);
      });
  } else if (course_name == "English By The Way") {
    ///English by the way tag
    RemoveClickfunnelTag.Tag(englishByTheWayTag, client_email);
    RemoveClickfunnelTag.Tag(englishByTheWayTag, client_email);
    //get old token
    Token.findById(id)
      .select("accessToken  -_id")
      .then(async (token) => {
        const { accessToken } = token;

        const newToken = await tradeRefreshToken.GetNewToken(accessToken);

        //update new token
        Token.findByIdAndUpdate(
          id,
          {
            $set: {
              accessToken: `${newToken}`,
            },
          },
          {
            new: true,
          },
          async (err, result) => {
            if (err) {
              console.log(err);
            }
            const { accessToken } = result;
            const tag = "english by the way";
            const response = await Aweber.removeTag(
              client_email,
              accessToken,
              tag
            );
            RemoveClickfunnelTag.Tag(englishByTheWayTag, client_email);
            RemoveClickfunnelTag.Tag(englishByTheWayTag, client_email);
            if (response == 209) {
              return res.status(200).json({ message: "success" });
            } else {
              return res.status(200).json({ message: "failed" });
            }
          }
        );
      })
      .catch((err) => {
        console.log("get access token Error: " + err);
      });
  }
});

router.get("/show-token", (req, res) => {
  console.log(req.query);

  const id = "61c63785bcb637c1cb9e6270";

  Token.findById(id)
    .select("accessToken  -_id")
    .then(async (token) => {
      const { accessToken } = token;
      return res.status(200).json({ accessToken });
    })
    .catch((err) => {
      if (err) {
        return res.status(200).json({ message: err });
      }
    });
});

module.exports = router;
