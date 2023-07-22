// SpotTradeDBHelper.js

import AsyncNedb from 'nedb-async';
import path from 'path';

const dataStoreFiles = {
  coinindex: path.join('db', 'spot-trade-coin-index.db'),
  transaction: path.join('db', 'spot-trade-transaction-history.db')
};

class SpotTradeDBHelper {
  constructor() {
    this.DB = {};

    // Initialize all data stores using nedb-async plugin
    Object.keys(dataStoreFiles).forEach(key => {
      const filename = dataStoreFiles[key];
      this.DB[key] = new AsyncNedb({ filename, autoload: true });
    });
  }

  async getAssetSummary() {
    const transactions = await this.DB.transaction.asyncFind({});
    const assetSummaryMap = new Map();

    for (const transaction of transactions) {
      const { asset, unit, entryprice } = transaction;

      if (assetSummaryMap.has(asset)) {
        const summary = assetSummaryMap.get(asset);
        summary.unit += unit;
        summary.entryprice += entryprice;
      } else {
        assetSummaryMap.set(asset, { asset, unit, entryprice });
      }
    }

    const assetSummaryArray = Array.from(assetSummaryMap.values()).map(summary => ({
      asset: summary.asset,
      unit: summary.unit,
      entryprice: summary.entryprice / summary.unit
    }));

    return assetSummaryArray;
  }

  async addTransactionHistory(transaction) {
    try {
      await this.DB.transaction.asyncInsert(transaction);
      return true;
    } catch (error) {
      console.error('Error adding transaction history:', error);
      return false;
    }
  }
}

export default SpotTradeDBHelper;
