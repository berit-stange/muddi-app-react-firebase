import React from 'react';
import { /* useState, */ useEffect/* , useRef */ } from "react";
// import { auth } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "./firebase-config";
import {
    updateDoc,
    // getDoc,
    doc,
    // collection,
    getDoc,
    // getDocs,
    // addDoc,
    // deleteDoc,
    // doc,
    // onSnapshot,
    // query,
    // where
} from "firebase/firestore";



const MedicationSettings = ({ medi, setEditActive, setElementTitle, title, setElementTime, time, setElementId, id }) => {

    const updateMedication = async (click, id) => {
        click.preventDefault();
        const medicationDoc = doc(db, "medication", id);
        await updateDoc(medicationDoc, {
            // time: time,
            title: title
        });
        // setElementTitle("");
        setEditActive(false);
    };

    const getMedication = /* async */ () => {
        // preventDefault();
        // const medicationDoc = doc(db, "medication", id);
        // /* await */ getDoc(medicationDoc, {
        //     // time: time,
        //     title: title
        // });
        setElementTitle("");
        // setEditActive(false);
        console.log("getMedication" + title);
    };

    useEffect(() => {
        // const item = medi;
        // const item = doc(db, "medication", id);
        // setElementTitle(title);
        // setElementTitle(title);
        // console.log("useEffect in MedicationSettings: --- " + setElementTitle(id));
        getMedication();
    },
        []
    );



    return (

        <div key={medi.id} className="modal">

            <div>
                <button className="modal-close"
                    onClick={() => {
                        setEditActive(false);
                    }} >
                    <span className="material-icons-round">
                        close
                    </span>
                </button>
            </div>

            <input
                type="text"
                placeholder={medi.title}
                value={title}
                onChange={(event) => { setElementTitle(event.target.value) }}
            />
            {/* <input
                type="text"
                value={time}
                onChange={(event) => { setElementTime(event.target.value) }}
            /> */}



            <div >
                <button
                    onClick={(click) => {
                        updateMedication(click, medi.id);
                    }}
                >

                    <span className="material-icons-round">
                        update
                    </span>
                </button>
            </div>


        </div >


    );
}

export default MedicationSettings;