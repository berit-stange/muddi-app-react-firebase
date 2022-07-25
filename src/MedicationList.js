import React from 'react';
import { useState, useEffect, useRef } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import MedicationSettings from './MedicationSettings';
import MedicationElement from './MedicationElement';

import { db } from "./firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const MedicationList = () => {

    const [user] = useAuthState(auth);
    const [medication, setMedication] = useState([]);
    const mediCollectionRef = useRef(collection(db, "medication"));
    const settingsCollectionRef = useRef(collection(db, "settings"));
    // const [searchTerm, setSearchTerm] = useState("");
    const [editActive, setEditActive] = useState("false");
    const [settings, setElements] = useState([]);


    const addMedi = async (id, settings) => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const settingsRef = doc(db, "settings", id);

        await addDoc(mediCollectionRef.current, {
            // id: settings.id,
            title: settings.title,
            comment: settings.dose,
            unit: settings.unit,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid,
            typeId: settingsRef.id
        });
    };


    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    // function showModal() {
    //     var answer = document.getElementById("modal");
    //     answer.classList.toggle("hide");
    // }

    const handleToggle = () => {
        setEditActive(!editActive);
    };

    useEffect(() => {
        const q = query(settingsCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setElements(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, settingsCollectionRef.current, handleSnapshot)
    }, [user.uid, settingsCollectionRef]);


    useEffect(() => {
        const q = query(mediCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setMedication(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, mediCollectionRef.current, handleSnapshot)
    }, [user.uid, mediCollectionRef]);


    return (

        <div className="blood-pressure-input-box">

            <h2>Einnahme dokumentieren</h2>
            {settings
                .sort((a, b) => a.title < b.title ? -1 : 1)
                .map((settings) => {
                    return (
                        <div className="medi-values" key={settings.id}>
                            <p className="medi-title">{settings.title} - {settings.dose} {settings.unit} </p>

                            <div>
                                <button
                                    className="btn-add-dose"
                                    onClick={() => { addMedi(settings.id, settings); }}>
                                    {settings.dose}
                                </button>
                            </div>
                        </div>

                    );
                })
            }


            <div className="medi-list">
                <h2>Aufzeichnung</h2>

                {/* <div className="search-box">
                    <input
                        type="search-input"
                        placeholder="Suche"
                        onChange={(event) => { setSearchTerm(event.target.value); }}
                        aria-label="Suche" />
                </div> */}


                {medication
                    .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                    // .filter((val) => { return (val.title.toLowerCase().includes(searchTerm.toLowerCase())) })
                    .map((medication) => {
                        return (
                            <div key={medication.id}>
                                {/* <div className="medi-list-item"> */}
                                <MedicationElement medi={medication} />
                                {/* <div>
                                        <p>{medication.time.toString()} - {medication.title} - {medication.comment}</p>
                                    </div> */}

                                {/* <div className="btn-box btn-med-delete"> */}
                                {/* <Link to="/medi-settings">
                                            <span className="material-icons-round">settings</span>
                                        </Link> */}



                                {/* <button onClick={handleToggle}>
                                            <span className="material-icons-round">settings</span>
                                        </button> */}
                                {/* <div className={editActive ? "hide" : null} id="modal">
                                            <MedicationSettings />
                                        </div> */}

                                {/* <button onClick={() => setEditActive(true)}>
                                            <span className="material-icons-round">settings</span>
                                        </button>
                                        {editActive === true && <MedicationSettings key={medication.id} setEditActive={setEditActive} />} */}


                                {/* <button onClick={() => { deleteMedication(medication.id); }} >
                                            <span className="material-icons-round">
                                                delete
                                            </span>
                                        </button> */}


                                {/* </div> */}
                                {/* </div> */}

                                {/* <div className="modal-wrap" id="modal"> */}



                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
}

export default MedicationList;