const getData = async () => {
  const res = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50",
    {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": "f4ad3937-d200-44ae-aea1-7047f8cb97b9",
      },
    }
  );
  const data = await res.json();
  const coin = data.data;
  console.log(coin);
  idArray = [];
  for (let i = 0; i < coin.length; i++) {
    idArray.push(coin[i].id);
  }
  return idArray;
  // const coins = data.data;
};

// -------------------Paparika----------------------------------
const getPaprika = async () => {
  const req = await fetch("https://api.coinpaprika.com/v1/coins/btc-bitcoin");

  const data = await req.json();
  console.log(data.logo);
};

// -------------------------------------------------------------

const getLogo = async (id) => {
  try {
    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${id}`,
      {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "X-CMC_PRO_API_KEY": "f4ad3937-d200-44ae-aea1-7047f8cb97b9",
        },
      }
    );
    const data = await res.json();
    console.log(data.data.logo);
  } catch (error) {
    console.log(error);
  }
};

const fetchData = async () => {
  try {
    const data = await getData();
    let logoData = [];
    for (let i = 0; i < data.length; i++) {
      getLogo(data[i]);
    }
  } catch (error) {
    console.log(error);
  }
};

// fetchData();

getData();
