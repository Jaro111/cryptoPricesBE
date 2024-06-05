const { response } = require("express");

const api = process.env.CMC_API;
// --------------------------------------------------------------------------------------------------------------------------------------
// Request coin data
const requestData = async (req, res, next) => {
  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${req.body.start}&limit=${req.body.limit}`;

    const res = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    }).then((response) => {
      return response.json();
    });
    // res.status(200).json({ message: "message", response: response });
    const response = res.data;
    req.response = response;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
//
// --------------------------------------------------------------------------------------------------------------------------------------
//Request  images main page
const requestImages = async (req, res) => {
  try {
    const data = req.response;
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
//

//Request coin for portfolio images
const requestImgPortfolio = async (req, res) => {
  try {
    const data = req.coinDetails;
    // let idArray = [];
    logoObject = {};
    // console.log(data);
    // await data.map((item) => {
    //   idArray.push(item.id);
    // });
    // const idString = idArray.join(",");
    const idString = data[0].coinDetails.idString;

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
        coinDetails: {
          id: item.coinDetails.id,
          buyPrice: item.coinDetails.buyPrice,
          qty: item.coinDetails.qty,
          CoinId: item.coinDetails.CoinId,
          Portfolio: item.coinDetails.Portfolio,
          Coin: item.coinDetails.Coin,
        },
        id: item.coinDetails.data.id,
        name: item.coinDetails.data.name,
        symbol: item.coinDetails.data.symbol,
        logo: logoObject[item.coinDetails.data.id].logo,
        platform: item.coinDetails.data.platform,
        quote: item.coinDetails.data.quote,
        rank: item.coinDetails.data.cmc_rank,
        supply: item.coinDetails.data.max_supply,
        circ_supply: item.coinDetails.data.circulating_supply,
        total_supply: item.coinDetails.data.total_supply,
        tags: item.coinDetails.data.tags,

        meta: {
          description: logoObject[item.coinDetails.data.id].description,
          tagNames: logoObject[item.coinDetails.data.id].tagNames,
          urls: logoObject[item.coinDetails.data.id].urls,
          contractAdress: logoObject[item.coinDetails.data.id].contract_address,
        },
      };
    });
    res.status(200).json({ message: "message", response: coinData });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
//
// --------------------------------------------------------------------------------------------------------------------------------------
// Get coin ids and symbols for search
const requestCoin = async (req, res) => {
  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`;

    const data = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    });

    const response = await data.json();

    res.status(200).json({ message: "message", response: response });
    return response;
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
//
//
// --------------------------------------------------------------------------------------------------------------------------------------
// Get coin by id

const requestById = async (req, res, next) => {
  try {
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${req.body.id}`;

    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    });

    const dataObj = await response.json();
    const data = Object.values(dataObj.data);

    req.response = data;
    // res.status(200).json({ message: "message", response: data });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const requestSingleImage = async (req, res) => {
  try {
    const data = req.response;
    const id = data[0].id;

    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${id}`;

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
    console.log(responseValues);
    const coinData = {
      id: data[0].id,
      name: data[0].name,
      symbol: data[0].symbol,
      logo: responseValues[0].logo,
      platform: data[0].platform,
      quote: data[0].quote,
      rank: data[0].cmc_rank,
      supply: data[0].max_supply,
      circ_supply: data[0].circulating_supply,
      total_supply: data[0].total_supply,
      tags: responseValues[0].tags,
      meta: {
        description: responseValues[0].description,
        tagNames: responseValues[0]["tag-names"],
        urls: responseValues[0].urls,
        contractAdress: responseValues[0].contract_address,
      },
    };
    res.status(200).json({ message: "message", response: coinData });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// get multiple coins by id

const requestMultiple = async (req, res, next) => {
  try {
    const buyDetails = req.buyDetails;
    const coinDetails = buyDetails.map((item) => {
      return {
        coinDetails: item.dataValues,
      };
    });

    for (let i = 0; i < coinDetails.length; i++) {
      console.log(coinDetails[i].coinDetails.Coin.dataValues.coinId);
    }

    let idArray = [];

    for (let i = 0; i < coinDetails.length; i++) {
      idArray.push(coinDetails[i].coinDetails.Coin.coinId);
    }
    const idString = idArray.join(",");

    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${idString}`;

    const coinData = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    });

    const data = await coinData.json();
    const objData = data.data;

    for (let i = 0; i < coinDetails.length; i++) {
      coinDetails[i].coinDetails.data =
        objData[coinDetails[i].coinDetails.Coin.coinId];
      coinDetails[i].coinDetails.idString = idString;
    }

    req.coinDetails = coinDetails;
    next();
    // res.status(200).json({ message: "message", response: coinDetails });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

https: module.exports = {
  requestData,
  requestImgPortfolio,
  requestCoin,
  requestById,
  requestSingleImage,
  requestMultiple,
  requestImages,
};
//
