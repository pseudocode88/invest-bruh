import { Navbar } from "renderer/components/NavBar";
import styles from "./investment.modules.scss";
import { Invest } from "./Invest";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { PerYear } from "./PerYear";

export const Investment = () => {
    useEffect(() => {
        window.electron.ipcRenderer.on('investment-add-new-success', handleAddInvestmentSuccess);
        window.electron.ipcRenderer.send('investment/get/peryear');
        window.electron.ipcRenderer.on('investment/get/peryear', handleGetPerYearData);
    }, []);

    const [perYearData, setPerYearData] = useState([]);

    const handleAddInvestmentSuccess = () => {
        toast.success("Investment added succesfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        window.electron.ipcRenderer.send('investment/get/peryear');
    }

    const handleGetPerYearData = (e, data) => {
        setPerYearData(data);
    }

    return (
        <main>
            <Navbar selected={'investment'} />

            <h1>Investment</h1>
            <div className={styles.Wrapper}>
                <div className={styles.Wrapper__Left}>
                    <PerYear perYearData={perYearData}></PerYear>
                </div>
                <div className={styles.Wrapper__Right}>
                    <Invest></Invest>
                </div>
            </div>
            <ToastContainer />
        </main>
    )
}