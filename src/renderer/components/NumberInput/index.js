import PropTypes from 'prop-types';
import styles from './numberinput.modules.scss';

export const NumberInput = ({
    // type = 'text',
    placeholder,
    defaultValue = '',
    value,
    onChange,
    errorMessage = '',
    // min = 0,
    // step = 0.001,
    size = "medium"
}) => {
    const isError = () => {
        return (errorMessage) ? styles.NumberInput__Error : styles.NumberInput__NoError;
    }

    const getSize = () => {
        return (size === "small") ? styles.NumberInput__Small : null;
    }

    const handleOnChange = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9.]/g, '');
        onChange(numericValue);
    }

    const renderErrorMessage = () => {
        return (errorMessage) ? <p className={styles.TextInput__ErrorMessage}>{errorMessage}</p> : null
    }

    return (
        <div className={[styles.NumberInput, getSize(), isError()].join(' ')}>
            <input type="text" placeholder={placeholder} value={value} onChange={handleOnChange} />
            {renderErrorMessage()}
        </div>
    )
}