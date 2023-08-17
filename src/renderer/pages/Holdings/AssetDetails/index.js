import moment from "moment";
import { Button } from "../../../components/Button";
import styles from "./assetdetails.modules.scss";

const AssetTransactions = ({ transactions = [], onClickAddTransaction }) => {
    const handleAddTransaction = (e) => {
        e.preventDefault();
        onClickAddTransaction()
    };

    const renderTransactions = () => {
        console.log("render trx", transactions);
        if (transactions.length <= 0) {
            return (
                <li className={styles.AssetTransactions__History_Empty}>
                    <p>No transactions yet</p>
                </li>
            );
        }

        const formatUnit = (transactionType, unit, direction) => {
            switch (transactionType) {
                case 'buy':
                    return unit;
                case 'sell':
                    return '-' + unit;
                case 'transfer':
                    return (direction.toUpperCase() === 'TRANSFER IN') ? unit : ("-" + unit);
                default:
                    return unit;
            }
        };

        const getTransactionTypeHighlightClass = (transactionType) => {
            switch (transactionType) {
                case 'buy':
                    return styles.highlight_buy;
                case 'sell':
                    return styles.highlight_sell;
                case 'transfer':
                    return styles.highlight_transfer;
            }

        }

        return transactions.map((entry, index) => {
            return (
                <li key={index} className={styles.AssetTransactions__History_Entry}>
                    <div className={styles.cell_date}>{moment(entry.date).format('DD MMM YYYY')}</div>
                    <div className={styles.cell_type}>
                        <span className={getTransactionTypeHighlightClass(entry.transactionType)}>{entry.transactionType}</span>
                    </div>
                    <div className={styles.cell_unit}>{formatUnit(entry.transactionType, entry.units, entry.direction || '')}</div>
                    <div className={styles.cell_marketprice}>
                        <span className={styles.highlight_currency}>$</span>{entry.marketPrice || ''}
                    </div>
                    <div className={styles.cell_value}><span className={styles.highlight_currency}>$</span>{entry.value || ''}</div>
                    <div className={styles.cell_action}>add</div>
                </li>
            )
        })
    }

    return (
        <div className={styles.AssetTransactions}>
            <div className={styles.AssetTransactions__HeadingWrapper}>
                <h3 className={styles.AssetTransactions__Heading}>Transaction History</h3>
                <Button size="xsmall" onClick={handleAddTransaction}>Add transaction</Button>
            </div>
            <ol className={styles.AssetTransactions__History}>
                <li className={styles.AssetTransactions__History_Header}>
                    <div className={styles.cell_date}>Date</div>
                    <div className={styles.cell_type}>Type</div>
                    <div className={styles.cell_unit}>Units</div>
                    <div className={styles.cell_marketprice}>Price</div>
                    <div className={styles.cell_value}>Value</div>
                    <div className={styles.cell_action}>Actions</div>
                </li>
                {renderTransactions()}
            </ol>
        </div>
    );
}

const AssetPlan = () => {
    return (
        <div className={styles.AssetPlan}>
            <h3 className={styles.AssetPlan__Heading}>Action Plan</h3>
            <div>

            </div>
        </div>
    );
}

const AssetOverview = ({ asset, transactions = [] }) => {

    const getTotalUnits = () => {
        return transactions.reduce((totalUnits, entry) => {
            switch (entry.transactionType) {
                case 'buy':
                    totalUnits += parseFloat(entry.units);
                    break;
                case 'sell':
                    totalUnits -= parseFloat(entry.units);
                    break;
                case 'transfer':
                    (entry.direction.toLowerCase() === 'transfer in') ? totalUnits += parseFloat(entry.units) : totalUnits -= parseFloat(entry.units);
                    break;
                default:
                    totalUnits += parseFloat(entry.units);
            }
            return totalUnits;
        }, 0)
    }

    return (
        <div>
            <h2 className={styles.AssetDetails__Header}>{asset.name}</h2>
            <div className={styles.AssetDetails__Info}>
                <p className={styles.AssetDetails__Info_Ticker}>{asset.ticker}</p>
                <p className={styles.AssetDetails__Info_Category}>{asset.category}</p>
            </div>
            <div className={styles.AssetDetails__Overview}>
                <div className={styles.AssetDetails__OverviewSnapshot}>
                    <p className={styles.AssetDetails__OverviewSnapshot_Label}>Current Value</p>
                    <p className={styles.AssetDetails__OverviewSnapshot_Value}>$1000</p>
                </div>
                <div className={styles.AssetDetails__OverviewSnapshot}>
                    <p className={styles.AssetDetails__OverviewSnapshot_Label}>Unrealised PnL</p>
                    <p className={[styles.AssetDetails__OverviewSnapshot_Value, styles.positive].join(' ')}>+$95</p>
                </div>
                <div className={styles.AssetDetails__OverviewSnapshot}>
                    <p className={styles.AssetDetails__OverviewSnapshot_Label}>Units</p>
                    <p className={styles.AssetDetails__OverviewSnapshot_Value}>{getTotalUnits()}</p>
                </div>
                <div className={styles.AssetDetails__OverviewSnapshotEmpty}></div>
            </div>
        </div>
    );
}

export const AssetDetails = ({ asset, transactions = [], onClickAddTransaction }) => {
    if (asset) {
        return (
            <div className={styles.AssetDetails}>
                <AssetOverview asset={asset} transactions={transactions}></AssetOverview>
                <AssetTransactions transactions={transactions} onClickAddTransaction={onClickAddTransaction}></AssetTransactions>
            </div>
        );
    } else {
        return (
            <div className={[styles.AssetDetails, styles.AssetDetails__Empty].join(' ')}>
                <h2>No Asset Added Yet</h2>
                <p>Please go ahead and add a transaction</p>
            </div>
        );
    }

}