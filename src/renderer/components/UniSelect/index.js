import { useState } from "react";
import styles from "./uniselect.modules.scss";

export const UniSelect = ({
    options = [],
    onChange,
    binaryColor = true
}) => {
    const [selected, setSelected] = useState(options[0].value);

    const isBinaryColor = (option) => {
        return (binaryColor) ? ((option.color.toUpperCase() === 'RED') ? styles.selected_negative : styles.selected_positive) : styles.selected;
    }

    const renderOptions = () => {
        let isSelected = '';

        return options.map((option, index) => {
            isSelected = (option.value === selected) ? isBinaryColor(option) : ''
            return <li className={isSelected} key={index} data-value={option.value} onClick={handleClick}>{option.name}</li>
        })
    }

    const handleClick = (e) => {
        const value = e.target.dataset.value
        setSelected(value);
        onChange(value);
    }

    return (
        <ol className={styles.UniSelect}>{renderOptions()}</ol>
    );
}