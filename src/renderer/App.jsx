import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './shared_styles/tokens.css';
import './shared_styles/react-select-override.css';
import './shared_styles/react-toastify-override.css';
import './shared_styles/mui-overriders.css';
import './App.css';
import routes from './constants/routes';
import { Home } from './pages/Home';
import { CashFlow } from './pages/CashFlow';
import { CashFlowAdd } from './pages/CashFlow_Add';
import { CashFlowBulkAdd } from './pages/CashFlow_BulkAdd';
import { CashFlowEdit } from './pages/CashFlow_Edit';
import { Holdings } from './pages/Holdings';
import { Trading } from './pages/Trading';
import { Settings } from './pages/Settings';


// function Hello() {

//   const [greet, setIsGreet] = useState('Welcome')

//   var callIPC = async () => {
//     window.electron.ipcRenderer.sendMessage('investment-insert', {
//       date: " Jun 23rd 2023",
//       category: "crypto",
//       amount: Math.random(10000),
//       source: "Monthly Investent"
//     });
//     window.electron.ipcRenderer.sendMessage('investment-per-year', []);
//   }

//   window.electron.ipcRenderer.on('investment-insert', (arg) => {
//     console.log(arg);
//     // setIsGreet(arg);
//   });

//   window.electron.ipcRenderer.sendMessage('investment-per-year', []);

//   window.electron.ipcRenderer.on('investment-per-year', (arg) => {
//     console.log(arg);
//     // setIsGreet(arg);
//   });

//   return (
//     <div>
//       <div className="Hello">
//         <h1>{greet}</h1>
//         <br />
//         <button type="button" onClick={callIPC}>
//           IPC Call
//         </button>
//       </div>
//     </div>
//   );
// }

export default function App() {

  // window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

  // window.electron.ipcRenderer.once('ipc-example', (arg) => {
  //   // eslint-disable-next-line no-console
  //   console.log(arg);
  // });

  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.CASHFLOW} element={<CashFlow />} />
        <Route path={routes.CASHFLOWADD} element={<CashFlowAdd />} />
        <Route path={routes.CASHFLOWEDIT} element={<CashFlowEdit />} />
        <Route path={routes.CASHFLOWBULKADD} element={<CashFlowBulkAdd />} />
        <Route path={routes.HOLDINGS} element={<Holdings />} />
        <Route path={routes.TRADING} element={<Trading />} />
        <Route path={routes.SETTINGS} element={<Settings />} />
      </Routes>
    </Router>
  );
}
