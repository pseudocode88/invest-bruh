import { Navbar } from "renderer/components/NavBar";
import { TextArea } from "renderer/components/TextArea";
import wrapper from "../../shared_styles/container.modules.scss";
import formstyles from "../../shared_styles/form.modules.scss";
import { PageHeader } from 'renderer/components/PageHeader';
import routes from '../../constants/routes';
import { Button } from "renderer/components/Button";
import styles from "./cashflowbulkadd.modules.scss";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const CashFlowBulkAdd = () => {
    useEffect(() => {
        window.electron.ipcRenderer.on('cashflow/bulkadd/success', handleBulkAddSuccess);
    }, []);

    const [rawData, setRawData] = useState();

    const navigate = useNavigate();

    const handleBulkAddSuccess = () => {
        new window.Notification("Cash Flow Added", { body: "All cash flow entries has added successdully" })
        window.electron.ipcRenderer.send('cashflow/get/peryear');
        resetForm();
    }

    const resetForm = () => {
        setRawData(' ');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        window.electron.ipcRenderer.send('cashflow/bulkadd', csvToJson(rawData));
    };

    const handleCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(routes.CASHFLOW);
    }

    const handleRawDataChange = (e) => {
        setRawData(e.target.value);
    }

    /**
     * Takes a raw CSV string and converts it to a JavaScript object.
     * @param {string} text The raw CSV string.
     * @param {string[]} headers An optional array of headers to use. If none are
     * given, they are pulled from the first line of `text`.
     * @param {string} quoteChar A character to use as the encapsulating character.
     * @param {string} delimiter A character to use between columns.
     * @returns {object[]} An array of JavaScript objects containing headers as keys
     * and row entries as values.
     */
    const csvToJson = (text, headers, quoteChar = '"', delimiter = ',') => {
        const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');

        const match = line => [...line.matchAll(regex)]
            .map(m => m[2])  // we only want the second capture group
            .slice(0, -1);   // cut off blank match at the end

        const lines = text.split('\n');
        const heads = headers ?? match(lines.shift());

        return lines.map(line => {
            return match(line).reduce((acc, cur, i) => {

                const key = heads[i].toLowerCase() ?? `extra_${i}`;

                // Attempt to parse as a number; replace blank matches with `null`
                let val = cur.length <= 0 ? null : Number(cur) || cur;
                if (key.toUpperCase() === 'AMOUNT') {
                    val = (typeof (val) === 'string') ? parseFloat(val.replace(',', '')) : parseFloat(val)
                }

                if (key.toUpperCase() === 'DATE') {
                    val = moment(val).format('YYYY-MM-DD')
                }

                return { ...acc, [key]: val };
            }, {});
        });
    }

    return (
        <main>
            <Navbar selected={'cashflow'}></Navbar>
            <div className={wrapper.ThreeColumn}>
                <div className={wrapper.ThreeColumn__Left}></div>
                <div className={[wrapper.ThreeColumn__Center, styles.CashFlowAddBulk].join(' ')}>
                    <PageHeader back={routes.CASHFLOW}>
                        <h1>Add Cash Flow in Bulk</h1>
                        <p>Use the form below to create a cash inflow or outflow</p>
                    </PageHeader>
                    <div className={styles.FormWrapper}>
                        <form className={formstyles.Form} onSubmit={handleSubmit}>
                            <div className={formstyles.Form__Control}>
                                <div className={formstyles.Form__LabelWrap}>
                                    <label className={formstyles.Form__Label}>Flow</label>
                                    <p className={formstyles.Form__LabelHelper}>If you are adding money to crypto then choose Cash In, otherwise if you are widthdrawing choose Cash out</p>
                                </div>
                                <TextArea onChange={handleRawDataChange} value={rawData}></TextArea>
                            </div>

                            <div className={formstyles.Form__ButtonGroup}>
                                <Button name={"Add"}></Button>
                                <Button type={"secondary"} variant={"neutral"} name={"Cancel"} onClick={handleCancel}></Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={wrapper.ThreeColumn__Right}></div>
            </div>
        </main>
    );
}