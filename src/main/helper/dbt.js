// import { HoldingsDBHelper } from './HoldingsDBHelper';

/**
let HoldingsDBHelper = require('./HoldingsDBHelper');

let db = new HoldingsDBHelper();

let result = '';

db.buy({
    pair: "BTC/USD",
    category: "Bluechip",
    units: 0.001,
    marketPrice: 29845.65,
    value: 321,
}).then((response) => {
    db.buy({
        pair: "BTC/USD",
        category: "Bluechip",
        units: 0.01,
        marketPrice: 18000,
        value: 300,
    }).then((response) => {
        db.buy({
            pair: "ETH/USD",
            category: "Bluechip",
            units: 1,
            marketPrice: 1900,
            value: 1900,
        }).then((response) => {
            db.getAllBrief().then(response => console.log(response))
        });
    });

});

*/

const axios = require('axios');

const getAssetIcon = async (apiKey, assetId) => {
    const apiUrl = `https://rest.coinapi.io/v1/assets/`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-CoinAPI-Key': apiKey,
            },
            // responseType: 'arraybuffer', // Tell Axios to treat the response as binary data (icon image)
        });

        // return Buffer.from(response.data, 'binary').toString('base64');
        // return `data:image/png;base64,${iconData}`;
        return response.data;
    } catch (error) {
        console.error('Error fetching asset icon:', error.message);
        return null;
    }
};

const apiKey = 'FDA19091-DC89-419D-8E0A-45D7F42AAC34';
const assetId = 'LBR'; // Replace 'BTC' with the asset_id of the cryptocurrency you want to get the icon for

getAssetIcon(apiKey, assetId)
    .then((iconUrls) => {
        if (iconUrls) {
            console.log('Asset Icon URL:', assetId, iconUrls.length);
            // console.log(iconUrls);
            // iconUrls.forEach(o => console.log(o))
            let obj = iconUrls.find(o => o.asset_id === assetId)
            console.log(obj);
            // Now you can use the iconUrl to display the asset icon in your application
        } else {
            console.log('Asset icon not found.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });