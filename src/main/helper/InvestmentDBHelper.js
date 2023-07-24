// SpotTradeDBHelper.js
const { join } = require('path');
const { AsyncNedb } = require('nedb-async');
const Moment = require('moment');
const rootDir = require('path').resolve('./');

const dataStoreFilePaths = {
    history: join(rootDir, 'db', 'investment-history.db')
};

class InvestmentDBHelper {
    constructor() {
        this.DB = {};

        // Iterate through dataStoreFilePaths and initialize datastores using nedb-async plugin
        for (const key in dataStoreFilePaths) {
            this.DB[key] = new AsyncNedb({ filename: dataStoreFilePaths[key] });
            this.DB[key].loadDatabase();
        }
    }

    async insertInvestment(entry) {
        try {
            const result = await this.DB.history.asyncInsert(entry);
            return !!result; // Returns true if the insertion was successful, false otherwise
        } catch (error) {
            console.error('Error occurred while inserting investment:', error);
            return false;
        }
    }

    async getInvestments() {
        try {
            const allInvestments = await this.DB.history.asyncFind({}, [['sort', { date: -1 }]]); // Find all records from 'DB.history'
            const investmentsPerYear = this.groupInvestmentsByYear(allInvestments);
            return investmentsPerYear;
        } catch (error) {
            console.error('Error occurred while fetching investments:', error);
            return [];
        }
    }

    // Helper function to group investments by year
    groupInvestmentsByYear(investments) {
        const investmentsPerYear = {};
        investments.forEach(investment => {
            const year = Moment(investment.date, 'MMM Do YYYY').year();
            if (!investmentsPerYear[year]) {
                investmentsPerYear[year] = [];
            }
            investmentsPerYear[year].push(investment);
        });

        return Object.entries(investmentsPerYear).map(([year, investments]) => ({
            year: parseInt(year),
            investments
        }));
    }
}

module.exports = InvestmentDBHelper;
