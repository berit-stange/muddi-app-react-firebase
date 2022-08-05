import React from "react";
import { useState/* , useEffect */ } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    // getDoc,
    // updateDoc
} from 'firebase/firestore';
import MedicationSettings from './MedicationSettings';


const MedicationElement = ({ medi, setEditActive, editActive }) => {


    const [time, setElementTime] = useState("");
    const [title, setElementTitle] = useState("");
    // const [unit, setElementUnit] = useState("");
    // const [dose, setElementDose] = useState("");

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    const selectMedi = () => {
        setEditActive(true);
        // const item = medi;
        // setElementTitle(item.title);
        // setElementTime(item.time);
        // console.log("selectMedi: " + item.title + " " + item.id);
        setElementTitle(medi.title);
        console.log("selectMedi: " + medi.title + " " + medi.id);
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


            <button onClick={() => selectMedi()} >
                <span className="material-icons-round">settings</span>
            </button>
            {
                editActive === true && <MedicationSettings
                    key={medi.id}
                    medi={medi}
                    setEditActive={setEditActive}
                    setElementTitle={setElementTitle}
                    title={title}
                    setElementTime={setElementTime}
                    time={time}
                />
            }

        </div>
    );

}

export default MedicationElement; 