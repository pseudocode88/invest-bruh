import { dialog, ipcMain } from 'electron';

const groupsPositionMapper = (groups, groupsPosition) => {
    let mappedGroups = [];
    groupsPosition.forEach(id => {
        const index = groups.findIndex(obj => obj._id === id)
        mappedGroups.push(groups[index]);
    })
    return mappedGroups;
}

ipcMain.on('assets/group/get', async (event, arg) => {
    await global.dbHelper.assets.getGroups()
        .then(groups => {
            global.dbHelper.assets.getPositionSettings()
                .then(groupsPosition => {
                    const result = groupsPositionMapper(groups, groupsPosition.value)
                    event.reply('assets/group/get/success', result);
                })
        })
});

ipcMain.on('assets/group/add', async (event, group) => {
    await global.dbHelper.assets.insertGroup(group)
        .then(result => {
            global.dbHelper.assets.addPositionSettings(result._id)
                .then(() => {
                    event.reply('assets/group/add/success', result);
                })
        })
});

ipcMain.on('assets/group/delete', async (event, groupId) => {
    const options = {
        type: 'question',
        buttons: ['Cancel', 'Yes, Delete'],
        defaultId: 2,
        title: 'Delete',
        message: 'Do you want delete the group?',
        detail: 'Note that this is a destructive action. All assets managed under the group get deleted, and you wont be able to undo it',
    };

    await dialog.showMessageBox(null, options)
        .then(async (result) => {
            if (result.response) {
                await global.dbHelper.assets.deleteGroup(groupId)
                    .then(result => {
                        global.dbHelper.assets.deletePositionSettings(groupId)
                            .then(result => {
                                event.reply('assets/group/delete/success', result);
                            })
                    })
            }
        });
});

ipcMain.on('assets/group/addasset', async (event, asset) => {
    const groupId = asset.group;
    delete asset.group;
    await global.dbHelper.assets.insertAssetToGroup(groupId, asset)
        .then((result) => {
            event.reply('assets/group/addasset/success', result);
        })
});

ipcMain.on('assets/group/position/update', async (event, groupsPosition) => {
    await global.dbHelper.assets.updateGroupsPosition(groupsPosition)
        .then((result) => {
            event.reply('assets/group/position/update/success', result);
        })
});

ipcMain.on('assets/transaction/add', async (event, transaction) => {
    await global.dbHelper.assets.insertTransaction(transaction)
        .then(result => {
            console.log(result);
            event.reply('assets/transaction/add/success', result);
        })
})

ipcMain.on('assets/transaction/get', async (event, groupId, ticker) => {
    console.log(groupId, ticker);
    await global.dbHelper.assets.getTransaction(groupId, ticker)
        .then(result => {
            console.log(result);
            event.reply('assets/transaction/get/success', result);
        })
})



// ipcMain.on('assets/history/buy', async (event, arg) => {
//     await global.dbHelper.holdings.buy(arg)
//         .then((result) => {
//             event.reply('assets/history/buy/success', result);
//         })
// });

