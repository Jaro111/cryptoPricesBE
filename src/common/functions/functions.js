const { forEach } = require("mathjs");

const api = process.env.CMC_API;
// Request coin data
const requestData = async (req, res, next) => {
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
    // res.status(200).json({ message: "message", response: response });
    req.response = response;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

//Request coin images
const requestImages = async (req, res) => {
  try {
    const data = req.response.data;
    let idArray = [];
    let logoArray = [];

    await data.map((item) => {
      idArray.push(item.id);
    });

    const idString = idArray.join(",");

    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${idString}`;

    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    }).then((response) => {
      return response.json();
    });

    const responseData = response.data;
    const responseValues = Object.values(responseData);

    responseValues.map((item) => {
      logoArray.push(item.logo);
    });

    const coinData = data.map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        logo: logoArray[index],
        quote: item.quote,
      };
    });

    // for (let i = 0; i < logoArray.length; i++) {
    //   coinData[i]["logo"] = logoArray[i];
    // }
    res.status(200).json({ message: "message", response: coinData });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
module.exports = { requestData, requestImages };
