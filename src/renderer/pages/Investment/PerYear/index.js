import moment from 'moment';
import styles from './peryear.modules.scss';
import { constants } from 'buffer';

export const PerYear = ({ perYearData }) => {

    const totalAmountInvestedPerYear = (records) => {
        return records.reduce((totalAmount, record) => totalAmount + parseFloat(record.amount), 0)
    }

    const renderPerYear = () => {
        if (!perYearData.length) {
            return renderEmptyState();
        }

        return perYearData.sort((a, b) => b.year - a.year).map((data, index) => {
            return (
                <div className={styles.Investment__PerYear} key={index}>
                    <div className={styles.Investment__PerYearInfo}>
                        <h2 className={styles.Investment__PerYearInfo_Year}>{data.year}</h2>
                        <p className={styles.Investment__PerYearInfo_TotalAmount}>
                            You have {data.investments.length} investments with a total of ${totalAmountInvestedPerYear(data.investments)}
                        </p>
                    </div>
                    <ol className={styles.Investment__Record}>
                        <li className={styles.Investment__Record_Title}>
                            <div className={styles.cell_date}>Date</div>
                            <div>Investment category</div>
                            <div>Sourced from</div>
                            <div className={styles.cell_amount}>Amount</div>
                        </li>
                        {renderEntries(data.investments)}
                    </ol>
                </div>
            );
        })
    };

    const renderEmptyState = () => {
        return (
            <div className={styles.Investment__Empty}>
                <h1>No Investments Yet</h1>
                <p>Please go ahead and add investments</p>
            </div>
        )
    }

    const renderEntries = (entries) => {
        return entries.map((entry, index) => {
            return (
                <li className={styles.Investment__Record_Entry} key={index}>
                    <div className={styles.cell_date}>{moment(entry.date).format('DD MMM YYYY')}</div>
                    <div>{entry.category}</div>
                    <div>{entry.source}</div>
                    <div className={styles.cell_amount}>${entry.amount}</div>
                </li >
            );
        })
    }

    return (
        <div className={styles.Investments}>
            {renderPerYear()}
        </div>
    )
}