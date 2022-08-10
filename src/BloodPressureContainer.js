import React from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase-config";
import BloodPressureElement from './BloodPressureElement';

import {
    collection,
    getDocs,
    addDoc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const BloodPressureContainer = () => {

    const [user] = useAuthState(auth);
    const [value1, setBloodPressureValue1] = useState("");
    const [value2, setBloodPressureValue2] = useState("");
    const [comment, setBloodPressureComment] = useState("");
    const [bloodPressure, setBloodPressure] = useState([]);
    const bloodPressureCollectionRef = useRef(collection(db, "bloodPressure"));


    const addBloodPressure = async (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(bloodPressureCollectionRef.current, {
            value1: value1,
            value2: value2,
            comment: comment,
            time: date,
            timestamp: dateSorting,
            uid: user.uid
        });
        setBloodPressureValue1("");
        setBloodPressureValue2("");
        setBloodPressureComment("");
    };


    useEffect(() => {
        const q = query(bloodPressureCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setBloodPressure(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        return onSnapshot(q, bloodPressureCollectionRef.current, handleSnapshot)
    }, [user.uid, bloodPressureCollectionRef]);



    return (
        <div className="blood-pressure-input-box">
            <h2>Gewicht hinzufügen</h2>
            <div className="blood-pressure-input">
                <div className="blood-pressure-values">
                    <input
                        placeholder="Wert 1"
                        value={value1}
                        onChange={(event) => {
                            setBloodPressureValue1(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Wert 2"
                        value={value2}
                        onChange={(event) => {
                            setBloodPressureValue2(event.target.value);
                        }}
                    />
                </div>
                <div className="blood-pressure-comment">
                    <input
                        placeholder="Kommentar"
                        value={comment}
                        onChange={(event) => {
                            setBloodPressureComment(event.target.value);
                        }}
                    />
                    <div className="btn-bp">
                        <button className="btn-add-bp" onClick={addBloodPressure} >+</button>
                    </div>
                </div>
            </div>


            <div className="blood-pressure-list">
                <h2>Aufzeichnung</h2>
                {bloodPressure
                    .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                    .map((bloodPressure) => {
                        return (

                            <div key={bloodPressure.id}  >
                                <BloodPressureElement
                                    bloodPressure={bloodPressure}
                                />
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
}

export default BloodPressureContainer;