import PropTypes from 'prop-types';
import styles from './textinput.modules.scss';

export const TextInput = ({
    type = 'text',
    placeholder,
    defaultValue = '',
    value,
    onChange,
    errorMessage = '',
    min = 0,
    step = 0.001,
    size = "medium",
    transform = "normal"
}) => {
    const isError = () => {
        return (errorMessage) ? styles.TextInput__Error : styles.TextInput__NoError;
    }

    const getSize = () => {
        return (size === "small") ? styles.TextInput__Small : null;
    }

    const handleOnChange = (event) => {
        let { value } = event.target;
        switch (transform) {
            case "uppercase":
                value = value.toUpperCase();
                break;
            case "lowercase":
                value = value.toLowerCase();
                break;
            default:
                value = value;
        }

        onChange(value);
    }

    const renderErrorMessage = () => {
        return (errorMessage) ? <p className={styles.TextInput__ErrorMessage}>{errorMessage}</p> : null
    }

    return (
        <div className={[styles.TextInput, getSize(), isError()].join(' ')}>
            <input type={type} placeholder={placeholder} min={min} value={value} step={step} onChange={handleOnChange} />
            {renderErrorMessage()}
        </div>
    )
}