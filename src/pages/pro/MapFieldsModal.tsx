import Modal from "../../components/modals/Modal";

interface IMapFieldsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (fields: any) => void;
    children: any;
}
const MapFieldsModal = ({ isOpen, onClose, onConfirm, children } : IMapFieldsModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {children}
        </Modal>
    )
}

export default MapFieldsModal

