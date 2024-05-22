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
//Request coin images
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
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${req.body.id}`;

    const res = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": api,
      },
    });

    const data = await res.json();
    const ObjData = data.data;
    const response = Object.values(ObjData);
    req.response = response;
    next();
    // res.status(200).json({ message: "message", response: dataObj });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

https: module.exports = {
  requestData,
  requestImages,
  requestCoin,
  requestById,
  requestSingleImage,
  requestMultiple,
};
//
