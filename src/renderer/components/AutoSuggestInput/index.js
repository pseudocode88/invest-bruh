import { useState, useEffect, useRef } from 'react';
import styles from './autosuggestinput.modules.scss';

export const AutoSuggestInput = ({
    suggestionList,
    onChange,
    value,
    transform,
    placeholder,
    size = "medium",
    listOnFocus = true
}) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);

    const suggestionListRef = useRef();

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
        const { value } = event.target;
        const transformedValue = transformInputValue(value);
        console.log("handle change");
        setInputValue(transformedValue);
        setShowPopup(true)
        setActiveSuggestion(-1);
        if (onChange) { onChange(transformedValue); }
    };

    const handleSuggestionClick = (suggestion) => {
        console.log("suggestion click", suggestion);
        setInputValue(suggestion);
        setActiveSuggestion(-1);
        setShowPopup(false);
        if (onChange) { onChange(suggestion); }
    };

    const filteredSuggestions = suggestionList.filter((suggestion) =>
        suggestion.toLowerCase().includes((inputValue.length) ? inputValue.toLowerCase() : '')
    );

    const transformInputValue = (input) => {
        switch (transform) {
            case 'uppercase':
                return input.toUpperCase();
            case 'lowercase':
                return input.toLowerCase();
            default:
                return input;
        }
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                setActiveSuggestion((prevActive) => Math.max(prevActive - 1, -1));
                break;
            case 'ArrowDown':
                event.preventDefault();
                (!showPopup) ? setShowPopup(true) : '';
                setActiveSuggestion((prevActive) => Math.min(prevActive + 1, filteredSuggestions.length - 1));
                break;
            case 'Escape':
                setShowPopup(false);
                break;
            case 'Enter':
                if (activeSuggestion >= 0) {
                    const suggestion = filteredSuggestions[activeSuggestion];
                    setInputValue(suggestion);
                    setActiveSuggestion(-1);
                    setShowPopup(false);
                    if (onChange) { console.log(suggestion, inputValue); onChange(suggestion); }
                }
                break;
            default:
                break;
        }
    };

    const handleOnFocus = () => {
        console.log(listOnFocus, "on focus");
        (listOnFocus) ? setShowPopup(true) : setShowPopup(false);
    }

    const handleOnBlur = () => {
        setShowPopup(false);
    }


    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    useEffect(() => {
        if (activeSuggestion !== -1 && suggestionListRef.current) {
            const suggestionItem = suggestionListRef.current.children[activeSuggestion];
            if (suggestionItem) {
                const listRect = suggestionListRef.current.getBoundingClientRect();
                const itemRect = suggestionItem.getBoundingClientRect();

                if (itemRect.bottom > listRect.bottom) {
                    suggestionListRef.current.scrollTop += itemRect.bottom - listRect.bottom;
                } else if (itemRect.top < listRect.top) {
                    suggestionListRef.current.scrollTop -= listRect.top - itemRect.top;
                }
            }
        }
    }, [activeSuggestion]);

    const getClassname = () => {
        return [
            styles.AutoSuggest,
            (size === "small") ? styles.AutoSuggest__Small : null,
            showPopup ? styles.AutoSuggest_Show : ''
        ].join(' ')
    }

    return (
        <div className={getClassname()}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                placeholder={placeholder}
                className={styles.AutoSuggest__Input}
            />
            {suggestionList.length > 0 && (
                <ul className={styles.AutoSuggest__List} ref={suggestionListRef}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                            className={index === activeSuggestion ? styles.AutoSuggest__ListActive : ''}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div >
    );
};

// inputValue !== '' && 