import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './shared_styles/tokens.css';
import './shared_styles/react-select-override.css';
import './shared_styles/react-toastify-override.css';
import './App.css';
import routes from './constants/routes';
import { Home } from './pages/Home';
import { CashFlow } from './pages/CashFlow';
import { CashFlowAdd } from './pages/CashFlow_Add';


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
      </Routes>
    </Router>
  );
}
