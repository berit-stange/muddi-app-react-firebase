import React from 'react';
import { useState, useEffect, useRef } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from "./firebase-config";

import {
    // addDoc,
    collection,
    // deleteDoc,
    updateDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const MedicationSettings = ({ medi }) => {

    const [user] = useAuthState(auth);

    // const [settings, setElements] = useState([]);
    // const [medication, setMedication] = useState([]);
    // const [comment, updateElementComment] = useState("");
    // const [time, updateElementTime] = useState("");
    // const [timestamp, updateElementTimestamp] = useState("");
    const [dbTitle, updateElementTitle] = useState("");
    // const [typeId, updateElementtypeId] = useState("");
    // const [unit, updateElementUnit] = useState("");
    // const [dose, updateElementDose] = useState("");

    // const [searchTerm, setSearchTerm] = useState("");
    // const [settings, setElements] = useState([]);
    // const mediCollectionRef = useRef(collection(db, "medication"));
    // const settingsCollectionRef = useRef(collection(db, "settings"));


    const updateMedication = async (click, id) => {
        click.preventDefault(); //e > referencing event listener onclick
        const medicationDoc = doc(db, "medication", id);
        await updateDoc(medicationDoc, {
            // comment: comment,
            // time: time,
            // timestamp: timestamp,
            title: dbTitle,
            // typeId: typeId,
            // uid: user.uid,
            // unit: unit
        });
        // updateElementComment("");
        // updateElementTime("");
        // updateElementTimestamp("");
        updateElementTitle("");
        // updateElementtypeId("");
        // updateElementUnit("");
        // updateElementDose("");
    };

    // useEffect(() => {
    //     const q = query(settingsCollectionRef.current, where("uid", "==", user.uid));
    //     const handleSnapshot = (snapshot) => {
    //         setElements(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getDocs(q).then(handleSnapshot);
    //     console.log("useEffect ok");
    //     return onSnapshot(q, settingsCollectionRef.current, handleSnapshot)
    // }, [user.uid, settingsCollectionRef]);

    // useEffect(() => {
    //     const q = query(mediCollectionRef.current, where("uid", "==", user.uid));
    //     const handleSnapshot = (snapshot) => {
    //         setMedication(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getDocs(q).then(handleSnapshot);
    //     console.log("useEffect ok");
    //     return onSnapshot(q, mediCollectionRef.current, handleSnapshot)
    // }, [user.uid, mediCollectionRef]);


    return (

        <div key={medi.id} className="blood-pressure-input-box">
            <div className="blood-pressure-values">
                <input
                    placeholder={medi.title}
                    // value={dbTitle} // wenn das da ist, erscheint die Eingabe in allen inputfeldern anders wenn mit Modal
                    onChange={(event) => {
                        updateElementTitle(event.target.value);
                    }}
                />
            </div>

            <div className="btn-box btn-med-delete">
                <button onClick={(click) => { updateMedication(click, medi.id); }} >
                    <span className="material-icons-round">
                        update
                    </span>
                </button>
            </div>


        </div>


    );
}

export default MedicationSettings;