import { ipcMain } from 'electron';

ipcMain.on('cashflow/add', async (event, arg) => {
    await global.db.investment.insertInvestment(arg)
        .then((result) => { event.reply('cashflow/add/success', result); })
});

ipcMain.on('cashflow/get/peryear', async (event, arg) => {
    await global.db.investment.getInvestments()
        .then((result) => { event.reply('cashflow/get/peryear', result); })
});