import { dialog, ipcMain } from 'electron';

ipcMain.on('cashflow/add', async (event, arg) => {
    await global.dbHelper.cashFlow.insertCashFlow(arg)
        .then((result) => { event.reply('cashflow/add/success', result); })
});

ipcMain.on('cashflow/bulkadd', async (event, arg) => {
    await global.dbHelper.cashFlow.insertCashFlow(arg)
        .then((result) => { event.reply('cashflow/bulkadd/success', result); })
});

ipcMain.on('cashflow/get/peryear', async (event, arg) => {
    await global.dbHelper.cashFlow.getCashFlow()
        .then((result) => { event.reply('cashflow/get/peryear', result); })
});

ipcMain.on('cashflow/get/record', async (event, arg) => {
    await global.dbHelper.cashFlow.getCashFlowSingleRecord(arg)
        .then((result) => { event.reply('cashflow/get/record/success', result); })
})

ipcMain.on('cashflow/update/record', async (event, arg) => {
    await global.dbHelper.cashFlow.updateCashFlowRecord(arg.id, arg.record)
        .then((result) => { event.reply('cashflow/update/record/success', result); })
})

ipcMain.on('cashflow/delete/confirm', async (event, arg) => {
    const options = {
        type: 'question',
        buttons: ['Cancel', 'Yes, Delete'],
        defaultId: 2,
        title: 'Delete',
        message: 'Do you want delete the record?',
        detail: 'Note that this is a destructive action, so once you delete you wont be able to undo',
    };

    await dialog.showMessageBox(null, options)
        .then(async (result) => {
            if (result.response) {
                await global.dbHelper.cashFlow.deleteCashFlow(arg)
                    .then((result) => { event.reply('cashflow/delete/success', result); })
            }
        })
})