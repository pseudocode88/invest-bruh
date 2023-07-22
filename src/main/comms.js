import { ipcMain } from 'electron';

ipcMain.on('investment-insert', async (event, arg) => {
    await global.db.investment.insertInvestment(arg)
        .then((result) => { console.log(arg); event.reply('investment-insert', result); })
});

ipcMain.on('investment-per-year', async (event, arg) => {
    await global.db.investment.getInvestments()
        .then((result) => { console.log(arg); event.reply('investment-per-year', result); })
});