import { useEffect, useState } from "react";
import styles from "./uniselect.modules.scss";

export const UniSelect = ({
    options = [],
    value,
    onChange,
    binaryColor = true,
    size = "medium"
}) => {
    useEffect(() => {
        setSelected(value);
    }, [value]);

    const [selected, setSelected] = useState(value);

    const isBinaryColor = (option) => {
        return (binaryColor) ? (
            (option.color.toUpperCase() === 'RED') ? styles.selected_negative : (
                (option.color.toUpperCase() === 'BLUE') ? styles.selected_neutral : styles.selected_positive)
        ) : styles.selected;
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

    const getSize = () => {
        return (size === "small") ? styles.UniSelect__Small : null;
    }

    return (
        <ol className={[styles.UniSelect, getSize()].join(' ')}>{renderOptions()}</ol>
    );
}