import { Navbar } from "renderer/components/NavBar";
import wrapper from "../../shared_styles/container.modules.scss";
import styles from "./cashflowadd.modules.scss";
import { PageHeader } from "renderer/components/PageHeader";
import routes from "../../constants/routes";
import { Form } from "./Form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';

export const CashFlowAdd = () => {
    useEffect(() => {
        window.electron.ipcRenderer.on('cashflow/add/success', handleAddCashFlowSuccess);
    }, []);

    const handleAddCashFlowSuccess = () => {
        toast.success("Cash flow added succesfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        window.electron.ipcRenderer.send('cashflow/get/peryear');
    }

    return (
        <main>
            <Navbar selected={'cashflow'} />

            <div className={wrapper.Main}>
                <PageHeader back={routes.CASHFLOW}>
                    <h1>Add Cash Flow</h1>
                    <p>Use the form below to create a cash inflow or outflow</p>
                </PageHeader>

                <div className={styles.FormWrapper}>
                    <Form></Form>
                </div>
            </div>

            <ToastContainer />
        </main >
    );
}