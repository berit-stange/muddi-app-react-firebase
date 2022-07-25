import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc
} from 'firebase/firestore';


const MedicationElement = ({ medi }) => {

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    return (
        <div key={medi.id} className="medi-list-item">
            <div>
                <p>{medi.time.toString()} - {medi.title} - {medi.comment}</p>
            </div>

            <button onClick={() => { deleteMedication(medi.id); }} >
                <span className="material-icons-round">
                    delete
                </span>
            </button>
        </div>


    );

}

export default MedicationElement; 