import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import {StyleSheet, css} from "aphrodite";
import {X} from "phosphor-react";
import themeVars from "../../util/themeVars";
interface IModalProps {
    children?: any;
    isOpen: boolean;
    onClose: () => void;
}
const Modal = ({ children, isOpen, onClose } : IModalProps) => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => setIsBrowser(true), []);

    // set the type for e as event
    const handleClose = (e: any) => {
        e.preventDefault();
        onClose();
    };




    const modalContent = isOpen ? (
        <div className={css(styles.modalOverlay)}>
            <div className={css(styles.modalWrapper)} aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className={css(styles.modal)}>
                    <div className={css(styles.modalHeader)}>
                        <button type="button" className={css(styles.modalCloseButton)} data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <X size={32} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    ) : null;
    if (isBrowser) {
        return createPortal(modalContent, document.getElementById("modal-root")!);
    } else {
        return null;
    }
};

export default Modal;

const styles = StyleSheet.create({
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.53)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        },
        modalWrapper: {
            position: "relative",
            width: "100vw",
            maxWidth: "120rem",
            maxHeight: "100vh",
            // margin: "0 auto",
            borderRadius: "2rem",
            boxShadow: "0 5px 16px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },

        modal: {
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: "100%",
            backgroundColor: "transparent",
            borderRadius: "2rem",
            boxShadow: "0 5px 16px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
        },

        modalHeader: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "0 2rem",
            zIndex: 100,
        },

        modalCloseButton: {
            position: "absolute",
            top: "1rem",
            right: "3rem",
            width: "1.5rem",
            height: "1.5rem",
            padding: "0",
            backgroundColor: "transparent",
            border: "0",
            cursor: "pointer",
            zIndex: 100,
            color: themeVars.colors.mainBackground.light,
        },



    }
);
