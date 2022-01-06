const axios = require("axios");

const removeTag = async (email, accessToken, tag) => {
  const accountId = 1025920;
  const listId = 5578186;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const data = JSON.stringify({
    tags: {
      remove: [`${tag}`],
    },
  });

  const config = {
    method: "PATCH",
    url: `https://api.aweber.com/1.0/accounts/${accountId}/lists/${listId}/subscribers?subscriber_email=${email}`,
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(config);
    const status = response.status;
    return status;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { removeTag };
