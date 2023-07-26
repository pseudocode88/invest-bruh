import { Button } from "../Button";
import styles from "./actioncard.modules.scss";

export const ActionCard = ({
    children,
    action,
    onClick = () => { }
}) => {
    return (
        <div className={styles.ActionCard}>
            {children}
            <Button size={"small"} type={"secondary"} variant={"brand"} onClick={onClick} name={action}></Button>
        </div>
    );
}