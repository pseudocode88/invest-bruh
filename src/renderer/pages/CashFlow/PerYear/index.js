import moment from 'moment';
import styles from './peryear.modules.scss';
import { constants } from 'buffer';

export const PerYear = ({ perYearData }) => {

    const calcFlowPerYear = (records, direction) => {
        return parseFloat(records.filter(({ flow }) => flow === direction)
            .reduce((totalAmount, record) => totalAmount + parseFloat(record.amount), 0)).toFixed(2);
    }

    const renderPerYear = () => {
        if (!perYearData.length) {
            return renderEmptyState();
        }

        return perYearData.sort((a, b) => b.year - a.year).map((data, index) => {
            return (
                <div className={styles.CashFlow__PerYear} key={index}>
                    <div className={styles.CashFlow__PerYearInfo}>
                        <h2 className={styles.CashFlow__PerYearInfo_Year}>{data.year}</h2>
                        <p className={styles.CashFlow__PerYearInfo_TotalAmount}>
                            In flow ${calcFlowPerYear(data.cashflows, 'Cash in')}, Out flow ${calcFlowPerYear(data.cashflows, 'Cash out')}
                        </p>
                    </div>
                    <ol className={styles.CashFlow__Record}>
                        <li className={styles.CashFlow__Record_Title}>
                            <div className={styles.cell_date}>Date</div>
                            <div className={styles.cell_flow}>Flow</div>
                            <div>Sourced from</div>
                            <div className={styles.cell_amount}>Amount</div>
                        </li>
                        {renderEntries(data.cashflows)}
                    </ol>
                </div>
            );
        })
    };

    const renderEmptyState = () => {
        return (
            <div className={styles.CashFlow__Empty}>
                <h1>No Cash Flow Yet</h1>
                <p>Please go ahead and add</p>
            </div>
        )
    }

    const renderEntries = (entries) => {
        const isCashIn = (flow) => { return (flow === 'Cash in') ? styles.cashin : styles.cashout; }
        console.log(entries.sort((a, b) => a.date - b.date))
        return entries.sort((a, b) => b.date - a.date)
            .map((entry, index) => {
                return (
                    <li className={styles.CashFlow__Record_Entry} key={index}>
                        <div className={styles.cell_date}>{moment(entry.date).format('DD MMM YYYY')}</div>
                        <div className={[styles.cell_flow, isCashIn(entry.flow)].join(' ')}>{entry.flow}</div>
                        <div>{entry.source}</div>
                        <div className={styles.cell_amount}>${entry.amount}</div>
                    </li >
                );
            })
    }

    return (
        <div className={styles.CashFlows}>
            {renderPerYear()}
        </div>
    )
}