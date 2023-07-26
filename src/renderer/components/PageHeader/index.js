import { Link } from "react-router-dom";
import styles from "./pageheader.modules.scss";


export const PageHeader = ({ children, back }) => {
    const isBackRequired = () => {
        return (back) ? <Link to={back}>← back</Link> : '';
    }
    return (
        <div className={styles.PageHeader} >
            {isBackRequired()}
            {children}
        </div >
    );
}