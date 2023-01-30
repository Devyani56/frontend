import AddDataSourceForm from "./AddDataSourceForm";
import Modal from "../../components/modals/Modal";
import {IDataSourceData} from "./IDataSource";
import {createDataSourceApi} from "../../util/api/create-data-source";


interface IAddDataSourceData {
    onClose : () => void;
    isOpen : boolean;
    formData : IDataSourceData;
    setFormData : (data : IDataSourceData) => void;

}
const AddDataSourceModal = ({onClose, isOpen, formData, setFormData} : IAddDataSourceData) => {
    const createDataSource = async () => {
        console.log(formData);
        const dformCopy = {...formData};
        const newMetrics = Object.entries(formData.metrics).filter((entry) => entry[1]).map((entry) => entry[0]);
        dformCopy.metrics = newMetrics as any;
        const response = await createDataSourceApi(dformCopy);
        console.log(response);

    }
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
        >
            <AddDataSourceForm
                onSubmit={createDataSource}
                formData={formData}
                setFormData={setFormData}
            />
        </Modal>
    );
};

export default AddDataSourceModal;
