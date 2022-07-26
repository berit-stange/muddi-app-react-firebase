import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    // updateDoc
} from 'firebase/firestore';
import MedicationSettings from './MedicationSettings';


const MedicationElement = ({ medi }) => {

    const [editActive, setEditActive] = useState("false");

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

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

            <button onClick={() => setEditActive(true)}>
                <span className="material-icons-round">settings</span>
            </button>
            {
                editActive === true && <MedicationSettings /* key={medi.id} */ medi={medi} setEditActive={setEditActive} />
            }

        </div>


    );

}

export default MedicationElement; 