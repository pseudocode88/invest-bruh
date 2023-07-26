import { useNavigate } from 'react-router';
import { Navbar } from "renderer/components/NavBar";
import styles from "./cashflow.modules.scss";
import wrapper from "../../shared_styles/container.modules.scss";
import { useEffect, useState } from 'react';
import { PerYear } from "./PerYear";
import { ActionCard } from "renderer/components/ActionCard";
import routes from '../../constants/routes';
import { PageHeader } from 'renderer/components/PageHeader';

export const CashFlow = () => {
    useEffect(() => {
        window.electron.ipcRenderer.send('cashflow/get/peryear');
        window.electron.ipcRenderer.on('cashflow/get/peryear', handleGetPerYearData);
    }, []);

    const [perYearData, setPerYearData] = useState([]);

    const navigate = useNavigate();

    const handleGetPerYearData = (e, data) => {
        setPerYearData(data);
    }

    const calculateTotalflow = (inflow) => {
        let totalFlow = 0;

        perYearData.forEach((year) => {

            totalFlow += year.cashflows.filter(({ flow }) => flow === ((inflow) ? 'Cash in' : 'Cash out'))
                .reduce((totalAmount, record) => totalAmount + parseFloat(record.amount), 0);
        });

        return parseFloat(totalFlow).toFixed(2);
    }

    return (
        <main>
            <Navbar selected={'cashflow'} />

            <div className={wrapper.Main}>
                <PageHeader>
                    <h1>Cash Flow</h1>
                    <p>Track of cash that you moved in and out of crypto</p>
                </PageHeader>

                <div className={styles.Briefing}>
                    <div>
                        <p>Total Cash In</p>
                        <p>${calculateTotalflow(true)}</p>
                    </div>

                    <div>
                        <p>Total Cash Out</p>
                        <p>${calculateTotalflow(false)}</p>
                    </div>
                </div>

                <div className={styles.CashFlowDetails}>
                    <div className={styles.CashFlowDetails__Left}>
                        <PerYear perYearData={perYearData}></PerYear>
                    </div>
                    <div className={styles.CashFlowDetails__Right}>
                        <ActionCard action={"Add now"} onClick={() => { navigate(routes.CASHFLOWADD) }}>
                            <h4>Add Cashflow</h4>
                            <p>Enter your cash inflow and outflow to crypto</p>
                        </ActionCard>

                        <ActionCard action={"Add now"} onClick={() => { navigate(routes.CASHFLOWBULKADD) }}>
                            <h4>Add Cashflow in Bulk</h4>
                            <p>Add your cash inflow and outflow in a bulk using csv format</p>
                        </ActionCard>
                    </div>
                </div>
            </div>
        </main >
    )
}