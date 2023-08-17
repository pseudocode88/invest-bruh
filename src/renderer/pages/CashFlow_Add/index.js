import { Navbar } from "renderer/components/NavBar";
import wrapper from "../../shared_styles/container.modules.scss";
import styles from "./cashflowadd.modules.scss";
import { PageHeader } from "renderer/components/PageHeader";
import routes from "../../constants/routes";
import { Form } from "./Form";
import { useEffect } from 'react';

export const CashFlowAdd = () => {
    useEffect(() => {
        window.electron.ipcRenderer.on('cashflow/add/success', handleAddCashFlowSuccess);
    }, []);

    const handleAddCashFlowSuccess = () => {
        new window.Notification("Cash Flow Added", { body: "Your cash entry has added successdully" })
        window.electron.ipcRenderer.send('cashflow/get/peryear');
    }

    const handleSubmit = (formData) => {
        window.electron.ipcRenderer.send('cashflow/add', formData);
    }

    return (
        // <main>
        //     <Navbar selected={'cashflow'} />

        //     <div className={wrapper.ThreeColumn}>
        //         <div className={wrapper.ThreeColumn__Left}></div>
        //         <div className={[wrapper.ThreeColumn__Center, styles.CashFlowAdd].join(' ')}>
        //             <PageHeader back={routes.CASHFLOW}>
        //                 <h1>Add Cash Flow</h1>
        //                 <p>Use the form below to create a cash inflow or outflow</p>
        //             </PageHeader>

        <div className={styles.FormWrapper}>
            <Form onSubmit={handleSubmit}></Form>
        </div>
        //     </div>
        //     <div className={wrapper.ThreeColumn__Right}></div>
        // </div>
        // </main >
    );
}