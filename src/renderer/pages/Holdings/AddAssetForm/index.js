import { useState } from "react";

import { TextInput } from "../../../components/TextInput";
import { AutoSuggestInput } from "../../../components/AutoSuggestInput";
import { Dropdown } from "../../../components/Dropdown";
import { Button } from "../../../components/Button";

import formstyles from "../../../shared_styles/form.modules.scss";
import styles from "./addassetform.modules.scss";


export const AddAssetForm = ({ groups, onSubmit, onCancel }) => {

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [ticker, setTicker] = useState();
    const [group, setGroup] = useState();

    const handleNameOnChange = (val) => { setName(val) }
    const handleCategoryOnChange = (val) => { setCategory(val) }
    const handleTickerOnChange = (val) => { setTicker(val) }
    const handleGroupOnChange = (val) => { setGroup(val) }

    const groupOption = groups.map(o => { return { name: o.name, value: o._id } })

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            category: category,
            ticker: ticker,
            group: group
        }

        onSubmit(formData);
    }

    return (
        <form className={formstyles.Form__Small} onSubmit={handleSubmit}>
            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Asset Name</label>
                </div>
                <AutoSuggestInput
                    suggestionList={[]}
                    size="medium" placeholder="eg: Bitcoin, Ethereum" value={name}
                    onChange={handleNameOnChange}>
                </AutoSuggestInput>
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Category</label>
                    <p className={formstyles.Form__LabelHelper}>
                        For tracking and portfolio design
                    </p>
                </div>
                <TextInput placeholder={"eg: Layer 1, DeFi"} value={category} onChange={handleCategoryOnChange}></TextInput>
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Ticker</label>
                    <p className={formstyles.Form__LabelHelper}>
                        The ticker of the asset used in the exchange
                    </p>
                </div>
                <TextInput placeholder={"eg: BTC, ETH"} value={ticker} onChange={handleTickerOnChange}></TextInput>
            </div>

            <div className={formstyles.Form__Control}>
                <div className={formstyles.Form__LabelWrap}>
                    <label className={formstyles.Form__Label}>Group</label>
                    <p className={formstyles.Form__LabelHelper}>
                        To which you want to add the asset to
                    </p>
                </div>
                <Dropdown size="small" defaultValue={groupOption[0]} options={groupOption} onChange={handleGroupOnChange}></Dropdown>
            </div>

            <div className={formstyles.Form__ButtonGroupStrech}>
                <Button size="small" name={"Add"}></Button>
                <Button size="small" type={"secondary"} variant={"neutral"} name={"Cancel"} onClick={handleCancel}></Button>
            </div>
        </form>
    );
}