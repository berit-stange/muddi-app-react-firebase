import React from 'react';
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase-config";
import {
    updateDoc,
    doc
} from "firebase/firestore";


const MedicationSettings = ({ medi, setEditActive }) => {

    // const [comment, updateElementComment] = useState("");
    const [dbTime, updateElementTime] = useState("");
    // const [timestamp, updateElementTimestamp] = useState("");
    const [dbTitle, updateElementTitle] = useState("");
    // const [typeId, updateElementtypeId] = useState("");
    // const [unit, updateElementUnit] = useState("");
    // const [dose, updateElementDose] = useState("");
    // const [settings, setElements] = useState([]);


    const updateMedication = /* async */ (click, id) => {
        click.preventDefault(); // referencing event listener onclick
        const medicationDoc = doc(db, "medication", id);
        /* await */ updateDoc(medicationDoc, {
            // comment: comment,
            time: dbTime,
            // timestamp: timestamp,
            title: dbTitle,
            // typeId: typeId,
            // uid: user.uid,
            // unit: unit
        });
        // updateElementComment("");
        updateElementTime("");
        // updateElementTimestamp("");
        updateElementTitle("");
        // updateElementtypeId("");
        // updateElementUnit("");
        // updateElementDose("");
    };




    return (

        <div key={medi.id} className="blood-pressure-input-box">
            <div className="blood-pressure-values">
                <input
                    placeholder={medi.title}
                    value={dbTitle} // wenn das da ist, erscheint die Eingabe in allen inputfeldern anders wenn mit Modal
                    onChange={(event) => {
                        updateElementTitle(event.target.value);
                    }}
                />
                <input
                    placeholder={medi.time}
                    value={dbTime} // wenn das da ist, erscheint die Eingabe in allen inputfeldern anders wenn mit Modal
                    onChange={(event) => {
                        updateElementTime(event.target.value);
                    }}
                />
            </div>

            <div className="btn-box btn-med-delete">
                <button onClick={(click) => {
                    updateMedication(click, medi.id);
                    setEditActive(false);
                }} >
                    <span className="material-icons-round">
                        update
                    </span>
                </button>
            </div>


        </div>


    );
}

export default MedicationSettings;