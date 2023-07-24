import PropTypes from 'prop-types';
import styles from './textinput.modules.scss';

export const TextInput = ({ type = 'text', placeholder, defaultValue = '', value, onChange }) => {
    return (
        <div className={styles.TextInput}>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

TextInput.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'date']),
    placeholder: PropTypes.any,
    defaultValue: PropTypes.any
}