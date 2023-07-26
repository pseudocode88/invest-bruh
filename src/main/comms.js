import { ipcMain } from 'electron';

ipcMain.on('cashflow/add', async (event, arg) => {
    await global.db.cashflow.insertCashFlow(arg)
        .then((result) => { event.reply('cashflow/add/success', result); })
});

ipcMain.on('cashflow/bulkadd', async (event, arg) => {
    await global.db.cashflow.insertCashFlow(arg)
        .then((result) => { event.reply('cashflow/bulkadd/success', result); })
});

ipcMain.on('cashflow/get/peryear', async (event, arg) => {
    await global.db.cashflow.getCashFlow()
        .then((result) => { event.reply('cashflow/get/peryear', result); })
});