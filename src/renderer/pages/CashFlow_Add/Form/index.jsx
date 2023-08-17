import formstyles from "../../../shared_styles/form.modules.scss";
import { TextInput } from "renderer/components/TextInput";
import moment from "moment";
import { Button } from "renderer/components/Button";
import styles from "./form.modules.scss";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import { UniSelect } from "renderer/components/UniSelect";

const formDataDefaults = {
    date: moment().format('YYYY-MM-DD'),
    amount: 1,
    source: '',
    flow: 'Cash in'
};

export const Form = ({
    onSubmit,
    formData = formDataDefaults,
    edit = false
}) => {
    useEffect(() => {
        if (formData) {
            setDate(formData.date);
            setAmount(formData.amount);
            setFlow(formData.flow);
            setSource(formData.source);
        } else {
            console.log('formData not found');
        }
    }, [formData]);

    const [date, setDate] = useState(formData.date);
    const [amount, setAmount] = useState(formData.amount);
    const [source, setSource] = useState(formData.source);
    const [flow, setFlow] = useState(formData.flow);

    const navigate = useNavigate();

    const handleDateChange = (e) => { setDate(e.target.value); }
    const handleAmountChange = (e) => { setAmount(e.target.value); }
    const handleSourceChange = (e) => { setSource(e.target.value); }
    const handleFlowChange = (value) => { setFlow(value); }

    const handleInvestSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            date: date,
            amount: amount,
            source: source,
            flow: flow
        })
        resetForm();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(routes.CASHFLOW);
    }

    const resetForm = () => {
        setDate(moment().format('YYYY-MM-DD'));
        setAmount(1);
        setSource('')
        setFlow('Cash in')
    }

    const flowOptions = [
        { name: 'Cash in', value: 'Cash in', color: 'green' },
        { name: 'Cash out', value: 'Cash out', color: 'red' }
    ];

    const renderButton = () => {
        if (edit) {
            return (
                <div className={formstyles.Form__ButtonGroup}>
                    <Button name={"Update"}></Button>
                    <Button type={"secondary"} variant={"neutral"} name={"Cancel"} onClick={handleCancel}></Button>
                </div>
            );
        }
        return (
            <div className={formstyles.Form__Control}>
                <Button name={"Update cash flow"}></Button>
            </div>
        );
    }

    return (
        <form className={formstyles.Form} onSubmit={handleInvestSubmit}>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Flow</label>
                    <p className={formstyles.Form__LabelHelper}>If you are adding money to crypto then choose Cash In, otherwise if you are widthdrawing choose Cash out</p>
                </div>
                <UniSelect value={flow} options={flowOptions} onChange={handleFlowChange} binaryColor={true}></UniSelect>
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Date</label>
                </div>
                <TextInput type="date" value={date} onChange={handleDateChange} />
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Amount</label>
                </div>
                <TextInput type="number" placeholder="100" value={amount} min={1} onChange={handleAmountChange} />
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Source</label>
                    <p className={formstyles.Form__LabelHelper}>For tracking purpose its good to add from where you source the amount</p>
                </div>
                <TextInput type="text" placeholder="Eg: Monthly investment" value={source} defaultValue="10" onChange={handleSourceChange} />
            </div>

            {renderButton()}
        </form>
    );
}