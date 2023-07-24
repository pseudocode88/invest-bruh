import formstyles from "../../../shared_styles/form.modules.scss";
import { TextInput } from "renderer/components/TextInput";
import moment from "moment";
import { Button } from "renderer/components/Button";
import styles from "./invest.modules.scss";
import { useEffect, useState } from 'react';

const InvestForm = () => {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [amount, setAmount] = useState(0);
    const [source, setSource] = useState('');


    const handleDateChange = (e) => { setDate(e.target.value); }
    const handleAmountChange = (e) => { setAmount(e.target.value); }
    const handleSourceChange = (e) => { setSource(e.target.value); }

    const handleInvestSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            window.electron.ipcRenderer.send('investment-add-new', {
                date: date,
                amount: amount,
                source: source
            });
        }
    };

    const isValid = () => {
        if (!amount) {
            return false;
        }

        return true;
    }

    return (
        <form className={formstyles.Form} onSubmit={handleInvestSubmit}>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Date of investment</label>
                </div>
                <TextInput type="date" value={date} onChange={handleDateChange} />
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Source</label>
                    <p className={formstyles.Form__LabelHelper}>For tracking purpose its good to add from where you source the amount for investment</p>
                </div>
                <TextInput type="text" placeholder="Eg: Monthly investment" value={source} defaultValue="10" onChange={handleSourceChange} />
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Amount</label>
                    <p className={formstyles.Form__LabelHelper}>The amount you planning to investing in USD</p>
                </div>
                <TextInput type="number" placeholder="100" value={amount} onChange={handleAmountChange} />
            </div>

            <div className={formstyles.Form__Control}>
                <Button name={"Add invesment"}></Button>
            </div>
        </form>
    );
}

export const Invest = () => {
    return (
        <div className={styles.Invest}>
            <h2 className={styles.Invest__Title}>Invest</h2>
            <p className={styles.Invest__SubTitle}>Use the form below to create an entry for your investment</p>
            <InvestForm></InvestForm>
        </div>
    );
}