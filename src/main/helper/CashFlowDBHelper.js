// SpotTradeDBHelper.js
const { join } = require('path');
const { AsyncNedb } = require('nedb-async');
const Moment = require('moment');
const rootDir = require('path').resolve('./');

const dataStoreFilePaths = {
    cashFlow: __dirname + '/_datastore-cash-flow.db'
};

class CashFlowDBHelper {
    constructor() {
        this.DB = {};

        // Iterate through dataStoreFilePaths and initialize datastores using nedb-async plugin
        for (const key in dataStoreFilePaths) {
            this.DB[key] = new AsyncNedb({ filename: dataStoreFilePaths[key] });
            this.DB[key].loadDatabase();
        }
    }

    async insertCashFlow(entry) {
        try {
            const result = await this.DB.cashFlow.asyncInsert(entry);
            return !!result; // Returns true if the insertion was successful, false otherwise
        } catch (error) {
            console.error('Error occurred while inserting cash flow:', error);
            return false;
        }
    }

    async deleteCashFlow(id) {
        try {
            const result = await this.DB.cashFlow.asyncRemove({ _id: id });
            return !!result; // Returns true if the insertion was successful, false otherwise
        } catch (error) {
            console.error('Error occurred while deleting cash flow:', error);
            return false;
        }
    }

    async getCashFlow() {
        try {
            const allCashFlow = await this.DB.cashFlow.asyncFind({}, [['sort', { date: -1 }]]);
            const cashFlowPerYear = this.groupCashFlowByYear(allCashFlow);
            return cashFlowPerYear;
        } catch (error) {
            console.error('Error occurred while fetching investments:', error);
            return [];
        }
    }

    async getCashFlowSingleRecord(id) {
        try {
            return await this.DB.cashFlow.asyncFindOne({ _id: id });
        } catch (error) {
            console.error('Error occurred while fetching investments:', error);
            return [];
        }
    }

    async updateCashFlowRecord(id, record) {
        try {
            return await this.DB.cashFlow.asyncUpdate({ _id: id }, { $set: record });
        } catch (error) {
            console.error('Error occurred while updating cashflow:', error);
            return [];
        }
    }

    // Helper function to group investments by year
    groupCashFlowByYear(cashflows) {
        const cashFlowPerYear = {};
        cashflows.forEach(cashflow => {
            const year = Moment(cashflow.date, 'MMM Do YYYY').year();
            if (!cashFlowPerYear[year]) {
                cashFlowPerYear[year] = [];
            }
            cashFlowPerYear[year].push(cashflow);
        });

        return Object.entries(cashFlowPerYear).map(([year, cashflows]) => ({
            year: parseInt(year),
            cashflows
        }));
    }
}

module.exports = CashFlowDBHelper;
