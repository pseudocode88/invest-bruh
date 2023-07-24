import { ipcMain } from 'electron';

ipcMain.on('investment-add-new', async (event, arg) => {
    await global.db.investment.insertInvestment(arg)
        .then((result) => { event.reply('investment-add-new-success', result); })
});

ipcMain.on('investment/get/peryear', async (event, arg) => {
    await global.db.investment.getInvestments()
        .then((result) => { event.reply('investment/get/peryear', result); })
});