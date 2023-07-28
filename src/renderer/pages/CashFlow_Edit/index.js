import { Navbar } from "../../components/NavBar";
import wrapper from "../../shared_styles/container.modules.scss";
import styles from "./cashflowedit.modules.scss";
import { PageHeader } from "../../components/PageHeader";
import routes from "../../constants/routes";
import { Form } from "../CashFlow_Add/Form";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const CashFlowEdit = () => {
    const [formData, setFormData] = useState();
    const { recordId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        window.electron.ipcRenderer.send('cashflow/get/record', recordId)
        window.electron.ipcRenderer.on('cashflow/get/record/success', handleGetRecordOnSuccess)
        window.electron.ipcRenderer.on('cashflow/update/record/success', handleUpdateRecordOnSuccess)
    }, [recordId])

    const handleSubmit = (formData) => {
        window.electron.ipcRenderer.send('cashflow/update/record', { id: recordId, record: formData })
    }

    const handleGetRecordOnSuccess = (e, record) => {
        setFormData({
            _id: record._id,
            date: record.date,
            amount: record.amount,
            source: record.source,
            flow: record.flow
        })
    }

    const handleUpdateRecordOnSuccess = () => {
        new window.Notification("Cash Flow Update", { body: "Your cash entry has updated successdully" })
        navigate(routes.CASHFLOW);
    }

    return (
        <main>
            <Navbar selected={'cashflow'} />

            <div className={wrapper.ThreeColumn}>
                <div className={wrapper.ThreeColumn__Left}></div>
                <div className={[wrapper.ThreeColumn__Center, styles.CashFlowEdit].join(' ')}>
                    <PageHeader back={routes.CASHFLOW}>
                        <h1>Edit Cash Flow</h1>
                        <p>Use the form edit the a cash data</p>
                    </PageHeader>

                    <div className={styles.FormWrapper}>
                        <Form edit={true} onSubmit={handleSubmit} formData={formData}></Form>
                    </div>
                </div>
                <div className={wrapper.ThreeColumn__Right}></div>
            </div>
        </main >
    );
}