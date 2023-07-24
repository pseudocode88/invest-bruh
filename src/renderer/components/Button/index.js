import styles from './button.modules.scss';

export const Button = ({ name }) => {
    return (
        <button className={styles.Button_primary}> {name}</button >
    );
}