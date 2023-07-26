import styles from './button.modules.scss';

export const Button = ({
    name,
    type,
    variant = "brand",
    size,
    onClick = () => { }
}) => {

    const selectType = () => {
        switch (type) {
            case "primary":
                return styles["Button_primary_" + variant];
            case "secondary":
                return styles["Button_secondary_" + variant];
            default:
                return styles["Button_primary_" + variant];
        }
    }

    const selectSize = () => {
        switch (size) {
            case "large":
                return styles.Button_large;
            case "medium":
                return styles.Button_medium;
            case "small":
                return styles.Button_small;
            default:
                return styles.Button_large;
        }
    }

    return (
        <button className={[selectType(), selectSize()].join(' ')} onClick={onClick}>{name}</button>
    );
}