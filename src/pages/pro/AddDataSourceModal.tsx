import AddDataSourceForm from "./AddDataSourceForm";
import Modal from "../../components/modals/Modal";
import {IDataSourceData} from "./IDataSource";
import {createDataSourceApi} from "../../util/api/create-data-source";
import SelectLocationOnMapModal from "./SelectLocationOnMapModal";
import {useState} from "react";

interface IAddDataSourceData {
    onClose : () => void;
    isOpen : boolean;
    formData : IDataSourceData;
    setFormData : (data : IDataSourceData) => void;

}
const AddDataSourceModal = ({onClose, isOpen, formData, setFormData} : IAddDataSourceData) => {
    const [pos, setPos] = useState({lat: 15.299326, lng: 74.123993});

    const createDataSource = async () => {
        console.log(formData);
        const dformCopy = {...formData};
        const newMetrics = Object.entries(formData.metrics).filter((entry) => entry[1]).map((entry) => entry[0]);
        dformCopy.metrics = newMetrics as any;
        const response = await createDataSourceApi(dformCopy);
        console.log(response);

    }
    const [mapSelectOpen, isMapSelectOpen] = useState(false);
    const closeMapSelect = () => {
        isMapSelectOpen(false);
    }

    const openMapSelect = () => {
        isMapSelectOpen(true);
    }

    const submitPos = (pos : any) => {
        console.log("submit");
        closeMapSelect();
        setFormData({...formData,
            location: {
                ...formData.location,
                lat: pos.lat,
                lng: pos.lng
            }
        });
    }
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
        >
            {mapSelectOpen && <SelectLocationOnMapModal
                setPos={setPos}
                onSubmit={submitPos}
                onClose={closeMapSelect}
                pos={pos}
            />}
            <AddDataSourceForm
                onSubmit={createDataSource}
                formData={formData}
                setFormData={setFormData}
                pos={pos}
                setPos={setPos}
                openMapSelect={openMapSelect}
            />
        </Modal>
    );
};

export default AddDataSourceModal;
