const { response } = require("express");

const requestData = async (req, res) => {
  const api = process.env.CMC_API;
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50";

    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    }).then((response) => {
      return response.json();
    });

    res.status(200).json({ message: "message", response: response });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { requestData };
