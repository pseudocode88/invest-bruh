const { AsyncNedb } = require('nedb-async');

const AssetDBHelper = () => {

    this.DB = {};

    const dataStoreFilePaths = {
        transaction: __dirname + '/_ds_assets_transaction.db',
        groups: __dirname + '/_ds_assets_group.db',
        settings: __dirname + '/_ds_assets_settings.db'
    };

    const freshInstall = () => {

        const installSettings = () => {
            return this.DB.settings.asyncFind({}).then((response) => {
                if (!response.length) {
                    return this.DB.settings.asyncInsert({
                        key: 'groupsPosition',
                        value: []
                    })
                } else {
                    return Promise.resolve();
                }

            })

        }

        const installDefaultGroup = () => {
            return getGroups({}).then(groups => {
                if (!groups.length) {
                    const groupData = {
                        name: 'HODL',
                        assets: []
                    };

                    return insertGroup(groupData);
                } else {
                    return Promise.resolve({ _id: -1 });
                }
            })
        }

        return installSettings().then(
            installDefaultGroup().then(response => {
                if (response._id !== -1) {
                    addPositionSettings(response._id);
                }
            })
        );
    }

    const init = () => {
        for (const key in dataStoreFilePaths) {
            this.DB[key] = new AsyncNedb({ filename: dataStoreFilePaths[key] });
            this.DB[key].loadDatabase();
        }

        freshInstall();
    };

    const getGroups = () => {
        return this.DB.groups.asyncFind({}, [['sort', { position: 1 }]])
    }

    const insertGroup = (group) => {
        return this.DB.groups.asyncInsert(group);
    }

    const deleteGroup = (groupId) => {
        return this.DB.groups.asyncRemove({ _id: groupId })
    }

    const insertAssetToGroup = (groupId, asset) => {
        return this.DB.groups.asyncUpdate({ _id: groupId }, { $push: { assets: asset } })
    }

    const addPositionSettings = (groupId) => {
        return this.DB.settings.asyncUpdate({ key: 'groupsPosition' }, { $push: { value: groupId } })
    }

    const deletePositionSettings = (groupId) => {
        return this.DB.settings.asyncUpdate({ key: 'groupsPosition' }, { $pull: { value: groupId } })
    }

    const getPositionSettings = () => {
        return this.DB.settings.asyncFindOne({ key: 'groupsPosition' })
    }

    const updateGroupsPosition = (groupsPosition) => {
        return this.DB.settings.asyncUpdate({ key: 'groupsPosition' }, {
            $set: { value: groupsPosition }
        });
    }

    const insertTransaction = (transaction) => {
        return this.DB.transaction.asyncInsert(transaction);
    }

    const getTransaction = (groupId, ticker) => {
        return this.DB.transaction.asyncFind({ groupId: groupId, asset: ticker }, [['sort', { date: -1 }]])
    }

    return {
        init: init,
        getGroups: getGroups,
        insertGroup: insertGroup,
        deleteGroup: deleteGroup,
        insertAssetToGroup: insertAssetToGroup,
        addPositionSettings: addPositionSettings,
        deletePositionSettings: deletePositionSettings,
        getPositionSettings: getPositionSettings,
        updateGroupsPosition: updateGroupsPosition,
        insertTransaction: insertTransaction,
        getTransaction, getTransaction
    };
}

module.exports = AssetDBHelper;

/**
class _AssetsDBHelper {
    constructor() {
        this.DB = {};

        for (const key in dataStoreFilePaths) {
            this.DB[key] = new AsyncNedb({ filename: dataStoreFilePaths[key] });
            this.DB[key].loadDatabase();
        }

        freshInstall();
    }



    async buy(trx) {
        var that = this;

        const getUpdateRecord = (asset, trx) => {
            return {
                totalUnits: parseFloat(asset.totalUnits) + parseFloat(trx.units),
                totalValue: parseFloat(asset.totalValue) + parseFloat(trx.value),
                avgMarketPrice: (parseFloat(asset.avgMarketPrice) + parseFloat(trx.marketPrice)) / 2
            }
        }

        return this.insertAssetTransaction(trx).then(trxId => {
            return that.findPairFromAssetBrief(trx.pair).then(asset => {
                if (asset) {
                    return (asset) ?
                        that.updateAsserBrief(asset._id, getUpdateRecord(asset, trx)) :
                        that.insertAssetBrief(get)
                }
            }
        });

        return this.findPairFromAssetBrief(data.pair).then(briefResult => {
            if (briefResult) {
                return that.insertHistory(data).then(historyResult => {
                    const record = {
                        totalUnits: parseFloat(briefResult.totalUnits) + parseFloat(data.units),
                        totalValue: parseFloat(briefResult.totalValue) + parseFloat(data.value),
                        avgMarketPrice: (parseFloat(briefResult.avgMarketPrice) + parseFloat(data.marketPrice)) / 2
                    };

                    console.log(record)

                    return that.updateBrief(briefResult._id, record)
                })
            } else {
                return that.insertHistory(data).then(historyResult => {
                    return that.insertBrief({
                        pair: data.pair,
                        category: data.category,
                        totalUnits: data.units,
                        avgMarketPrice: data.marketPrice,
                        totalValue: data.value,
                    })
                })
            }
        })
    }

    async insertAssetBrief(entry) {
        return await this.DB.assetBrief.asyncInsert(entry);
        // try {
        //     const result = await this.DB.assetBrief.asyncInsert(entry);
        //     return !!result;
        // } catch (error) {
        //     console.error('Error occurred while inserting cash flow:', error);
        //     return false;
        // }
    }

    async getAllBrief() {
        try {
            const allBriefing = await this.DB.holdingsBrief.asyncFind({});
            return this.groupBriefByCategory(allBriefing);
        } catch (error) {
            console.error('Error occurred while inserting cash flow:', error);
            return false;
        }
    }

    async updateAsserBrief(id, record) {
        // try {
        return await this.DB.assetBrief.asyncUpdate({ _id: id }, { $set: record });
        // } catch (error) {
        //     console.error('Error occurred while updating cashflow:', error);
        //     return [];
        // }
    }

    async insertAssetTransaction(entry) {
        // try {
        return await this.DB.assetTransaction.asyncInsert(entry);
        //     return !!result;
        // } catch (error) {
        //     console.error('Error occurred while inserting cash flow:', error);
        //     return false;
        // }
    }

    async findPairFromAssetBrief(pair) {
        return await this.DB.assetBrief.asyncFindOne({ pair: pair });
    }

    groupBriefByCategory(briefing) {
        const briefByCategory = {};

        briefing.forEach(brief => {
            const category = brief.category
            if (!briefByCategory[category]) {
                briefByCategory[category] = [];
            }
            briefByCategory[category].push(brief);
        });

        return Object.entries(briefByCategory).map(([category, briefings]) => ({
            category: category,
            briefings
        }));
    }
}

 */