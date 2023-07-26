import styles from "./textarea.modules.scss";

export const TextArea = ({
    value,
    onChange,
    errorMessage = '',
}) => {
    const isError = () => {
        return (errorMessage) ? styles.TextInput__Error : '';
    }

    return (
        <div className={[styles.TextArea, isError()].join(' ')}>
            <textarea onChange={onChange}>{value}</textarea>
            <p className={styles.TextArea__ErrorMessage}>{errorMessage}</p>
        </div>
    );
}