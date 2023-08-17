import { useState, useEffect, useRef } from 'react';
import styles from "./dropdown.modules.scss";
import { ArrowDownward, ExpandMore } from '@mui/icons-material';

const defaultSelectedValue = {
    name: 'Select option',
    value: -1
}

export const Dropdown = ({
    options,
    onChange,
    defaultValue = defaultSelectedValue,
    size = "medium"
}) => {

    const [selectedOptions, setSelectedOption] = useState(defaultValue);
    const [value, setValue] = useState(defaultValue.value);
    const [showList, setShowList] = useState(false);
    const dropdownRef = useRef(null);

    // useEffect(() => {
    //     setSelectedOption(defaultValue);
    //     setValue(defaultValue.value);
    // }, [options]);


    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowList(false);
        }
    };

    const renderOptions = () => {
        return options.map((o, index) => {
            return <li key={index} onClick={() => { handleOptionSelect(o) }}>{o.name}</li>
        })
    };

    const getClassname = () => {
        return [
            styles.Dropdown,
            (size === "small") ? styles.Dropdown__Small : null,
            (showList) ? styles.Dropdown_Show : null
        ].join(' ')
    }

    const handleShowList = () => { console.log(showList); setShowList((showList) ? false : true) }

    const handleOptionSelect = (o) => {
        setSelectedOption(o);
        setValue(o.value);
        setShowList(false);
        onChange(o.value);
    }

    return (
        <div className={getClassname()} ref={dropdownRef} onClick={handleShowList}>
            <div className={styles.Dropdown__Field}>
                <span>{selectedOptions.name}</span>
                <ExpandMore></ExpandMore>
            </div>
            <ul className={styles.Dropdown__List}>
                {renderOptions()}
            </ul>
        </div>
    )
}