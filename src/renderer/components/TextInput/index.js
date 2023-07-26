import PropTypes from 'prop-types';
import styles from './textinput.modules.scss';

export const TextInput = ({
    type = 'text',
    placeholder,
    defaultValue = '',
    value,
    onChange,
    errorMessage = '',
    min = 0
}) => {
    const isError = () => {
        return (errorMessage) ? styles.TextInput__Error : '';
    }

    return (
        <div className={[styles.TextInput, isError()].join(' ')}>
            <input type={type} placeholder={placeholder} min={min} value={value} onChange={onChange} />
            <p className={styles.TextInput__ErrorMessage}>{errorMessage}</p>
        </div>
    )
}

TextInput.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'date']),
    placeholder: PropTypes.any,
    defaultValue: PropTypes.any
}