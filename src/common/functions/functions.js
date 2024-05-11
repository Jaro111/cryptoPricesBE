const { forEach } = require("mathjs");

const api = process.env.CMC_API;
// Request coin data
const requestData = async (req, res, next) => {
  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${req.body.start}&limit=${req.body.limit}`;

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
//
//Request coin images
const requestImages = async (req, res) => {
  try {
    const data = req.response.data;
    let idArray = [];
    logoObject = {};
    console.log(data);
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
    console.log(responseData);
    const responseValues = Object.values(responseData);
    responseValues.map((item) => {
      logoObject[item.id] = {
        logo: item.logo,
        description: item.description,
        tags: item.tags,
        tagNames: item["tag-names"],
        urls: item.urls,
        platform: item.platform,
        contract_address: item.contract_address,
      };
    });
    const coinData = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        logo: logoObject[item.id].logo,
        platform: item.platform,
        quote: item.quote,
        rank: item.cmc_rank,
        supply: item.max_supply,
        circ_supply: item.circulating_supply,
        total_supply: item.total_supply,
        tags: item.tags,
        meta: {
          description: logoObject[item.id].description,
          tagNames: logoObject[item.id].tagNames,
          urls: logoObject[item.id].urls,
          contractAdress: logoObject[item.id].contract_address,
        },
      };
    });
    res.status(200).json({ message: "message", response: coinData });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
module.exports = { requestData, requestImages };
