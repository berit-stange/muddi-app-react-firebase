import React from "react";
import { useState/* , useEffect */ } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    // getDocs
    // updateDoc
} from 'firebase/firestore';
import MedicationSettings from './MedicationSettings';


const MedicationElement = ({ medi }) => {

    const [editActive, setEditActive] = useState("false"); // open + close Modal

    // const [time, setElementTime] = useState("");
    // const [title, setElementTitle] = useState("");
    // const [unit, setElementUnit] = useState("");
    // const [dose, setElementDose] = useState("");

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    // const getMedi = (id) => {
    //     const mediDoc = doc(db, "medication", id);

    // }

    // const openModal = () => {
    //     localStorage.setItem("medi", JSON.stringify(medi))
    //     setEditActive(true);
    // }

    const selectMedi = () => {
        // localStorage.setItem("medi", JSON.stringify(medi))
        setEditActive(true);
        // setElementTitle();
        // console.log(medi.title);
    }

    return (
        <div key={medi.id} className="medi-list-item">
            <div>
                <p>{medi.time.toString()} - {medi.title} - {medi.dose} {medi.unit}</p>
            </div>

            <button onClick={() => { deleteMedication(medi.id); }} >
                <span className="material-icons-round">
                    delete
                </span>
            </button>

            {/* setEditActive(true)  */}
            {/* <button onClick={() => openModal()} >
                <span className="material-icons-round">settings</span>
            </button>
            {editActive === true && <MedicationSettings key={medi.id} medi={medi} setEditActive={setEditActive} />} */}

            <button onClick={() => selectMedi()} >
                <span className="material-icons-round">settings</span>
            </button>
            {editActive === true && <MedicationSettings key={medi.id} medi={medi} setEditActive={setEditActive} /* setElementTitle={setElementTitle} */ />}

        </div>
    );

}

export default MedicationElement; 