import styles from './checkbox.modules.scss';

export const Checkbox = ({
    name,
    label
}) => {
    return (
        <label className={styles.Checkbox}>{label}
            <input type="checkbox" />
            <span class={styles.Checkbox__Checkmark}></span>
        </label >
    );
}