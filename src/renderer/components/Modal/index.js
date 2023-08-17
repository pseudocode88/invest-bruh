import { useState, useRef, useEffect } from "react";
import styles from "./modal.modules.scss";
import { ArrowForward } from "@mui/icons-material";

export const Modal = ({ title, show = false, onClose, children }) => {

    const [isActive, setIsActive] = useState(false | show);
    const overlay = useRef();

    const handleOverlayClick = (event) => {
        if (overlay.current === event.target) {
            handleClose();
        }
    };

    const showModal = () => {
        return [styles.Modal, (show) ? styles.Modal_Show : null].join(' ')
    }

    const handleClose = () => {
        setIsActive(false);
        onClose();
    }

    return (
        <div className={showModal()} ref={overlay} onClick={handleOverlayClick}>
            <div className={styles.Modal__Container}>
                <div className={styles.Modal__Head}>
                    <h2>{title}</h2>
                    <ArrowForward fontSize={'large'} onClick={handleClose}></ArrowForward>
                </div>
                {children}
            </div>
        </div>
    );
}