import { useState } from "react";
import moment from "moment";

import { Navbar } from "../../../components/NavBar";
import { PageHeader } from '../../../components/PageHeader';
import { NumberInput } from "../../../components/NumberInput";
import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { AutoSuggestInput } from "../../../components/AutoSuggestInput";
import { UniSelect } from "../../../components/UniSelect";
import { Dropdown } from "../../../components/Dropdown";

import formstyles from "../../../shared_styles/form.modules.scss";
import styles from "./addtransactionform.modules.scss";


const BuyForm = ({ onSubmit }) => {
    const [quote, setQuote] = useState();
    const [marketPrice, setMarketPrice] = useState();
    const [units, setUnits] = useState();
    const [value, setValue] = useState();
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    const handleOnChange = {
        quote: (val) => { setQuote(val) },
        marketPrice: (val) => { setMarketPrice(val) },
        units: (val) => { setUnits(val) },
        value: (val) => { setValue(val) },
        date: (val) => { setDate(val) }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (quote && marketPrice && units && value && date) {
            onSubmit({
                quote: quote,
                marketPrice: marketPrice,
                units: units,
                value: value,
                date: date
            })

            resetForm();
        }
    }

    const resetForm = () => {
        setQuote('');
        setMarketPrice('');
        setUnits('');
        setValue('');
        setDate(moment().format('YYYY-MM-DD'));
    }

    return (
        <form className={formstyles.Form__Small} onSubmit={handleSubmit}>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Quote</label>
                    <p className={formstyles.Form__LabelHelper}>
                        Enter the quote you used to buy. Eg: USDT, USDC, BTC, ETH, etc
                    </p>
                </div>
                <TextInput transform="uppercase" size="small" value={quote} onChange={handleOnChange.quote}></TextInput>
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Market price</label>
                    <p className={formstyles.Form__LabelHelper}>At which you are buying</p>
                </div>
                <NumberInput size="small" value={marketPrice} onChange={handleOnChange.marketPrice}></NumberInput>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Units</label>
                    <p className={formstyles.Form__LabelHelper}>That you are getting</p>
                </div>
                <NumberInput size="small" value={units} onChange={handleOnChange.units}></NumberInput>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Value</label>
                    <p className={formstyles.Form__LabelHelper}>That you are spending</p>
                </div>
                <NumberInput size="small" value={value} onChange={handleOnChange.value}></NumberInput>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Date</label>
                </div>
                <TextInput size="small" type="date" value={date} onChange={handleOnChange.date}></TextInput>
            </div>
            <div className={[formstyles.Form__ButtonGroupStrech].join(' ')}>
                <Button size="small">Add</Button>
            </div>
        </form>
    );
}

const SellForm = ({ onSubmit }) => {
    const [quote, setQuote] = useState();
    const [marketPrice, setMarketPrice] = useState();
    const [units, setUnits] = useState();
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    const handleOnChange = {
        quote: (val) => { setQuote(val) },
        marketPrice: (val) => { setMarketPrice(val) },
        units: (val) => { setUnits(val) },
        date: (val) => { setDate(val) }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (quote && marketPrice && units && date) {
            onSubmit({
                quote: quote,
                marketPrice: marketPrice,
                units: units,
                date: date
            })

            resetForm();
        }
    }

    const resetForm = () => {
        setQuote('');
        setMarketPrice('');
        setUnits('');
        setDate(moment().format('YYYY-MM-DD'));
    }

    return (
        <form className={formstyles.Form__Small} onSubmit={handleSubmit}>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Quote</label>
                    <p className={formstyles.Form__LabelHelper}>
                        Enter the quote you used to sell. Eg: USDT, USDC, BTC, ETH, etc
                    </p>
                </div>
                <TextInput transform="uppercase" size="small" value={quote} onChange={handleOnChange.quote}></TextInput>
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Market price</label>
                    <p className={formstyles.Form__LabelHelper}>At which you are selling</p>
                </div>
                <NumberInput size="small" value={marketPrice} onChange={handleOnChange.marketPrice}></NumberInput>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Units</label>
                    <p className={formstyles.Form__LabelHelper}>That you are selling</p>
                </div>
                <NumberInput size="small" value={units} onChange={handleOnChange.units}></NumberInput>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Date</label>
                </div>
                <TextInput size="small" type="date" value={date} onChange={handleOnChange.date}></TextInput>
            </div>
            <div className={[formstyles.Form__ButtonGroupStrech].join(' ')}>
                <Button size="small">Add</Button>
            </div>
        </form>
    );
}

const TransferForm = ({ onSubmit }) => {
    const [direction, setDirection] = useState('Transfer in');
    const [units, setUnits] = useState();
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    const handleOnChange = {
        direction: (val) => { setDirection(val) },
        units: (val) => { setUnits(val) },
        date: (val) => { setDate(val) }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (direction && units && date) {
            onSubmit({
                direction: direction,
                units: units,
                date: date
            })

            resetForm();
        }
    }

    const resetForm = () => {
        setDirection('');
        setUnits('');
        setDate(moment().format('YYYY-MM-DD'));
    }

    const directionOptions = [
        { name: 'Transfer In', value: 'Transfer in' },
        { name: 'Transfer Out', value: 'Transfer out' }
    ]

    return (
        <form className={formstyles.Form__Small} onSubmit={handleSubmit}>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Direction</label>
                    {/* <p className={formstyles.Form__LabelHelper}>At which you are selling</p> */}
                </div>
                <Dropdown options={directionOptions} size="small" defaultValue={directionOptions[0]} onChange={handleOnChange.direction}></Dropdown>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Units</label>
                    <p className={formstyles.Form__LabelHelper}>That you are selling</p>
                </div>
                <NumberInput size="small" value={units} onChange={handleOnChange.units}></NumberInput>
            </div>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Date</label>
                </div>
                <TextInput size="small" type="date" value={date} onChange={handleOnChange.date}></TextInput>
            </div>
            <div className={[formstyles.Form__ButtonGroupStrech].join(' ')}>
                <Button size="small">Add</Button>
            </div>
        </form>
    );
}

export const AddTransactionForm = ({ onSubmit, asset, group }) => {
    const [transactionType, setTransactionType] = useState('buy');


    const TransactionOptions = [
        { name: 'Buy', value: 'buy', color: 'green' },
        { name: 'Transfer', value: 'transfer', color: 'blue' },
        { name: 'Sell', value: 'sell', color: 'red' }
    ];

    const handleOnSubmit = {
        transaction: (formData) => {
            formData.transactionType = transactionType;
            formData.groupId = group._id
            formData.asset = asset.ticker;
            onSubmit(formData);
        }
    }

    const handleOnChange = {
        transactionType: (val) => { setTransactionType(val) },
    }

    const renderForm = () => {
        switch (transactionType) {
            case 'buy':
                return (<BuyForm onSubmit={handleOnSubmit.transaction} ></BuyForm>);
            case 'sell':
                return (<SellForm onSubmit={handleOnSubmit.transaction}></SellForm>);
            case 'transfer':
                return (<TransferForm onSubmit={handleOnSubmit.transaction}></TransferForm>)
            default:
                return (<BuyForm onSubmit={handleOnSubmit.transaction} ></BuyForm>);
        }
    }

    return (
        <div className={styles.AddForm}>
            <UniSelect
                size="small"
                value={transactionType}
                options={TransactionOptions}
                onChange={handleOnChange.transactionType}>
            </UniSelect>
            <div>
                <p>{group.name}</p>
                <p>{asset.name} - {asset.ticker}</p>
            </div>
            {renderForm()}
        </div>
    )
}