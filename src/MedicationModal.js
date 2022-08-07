import React from 'react';
import { /* useState, */ useEffect/* , useRef */ } from "react";
// import { auth } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { db } from "./firebase-config";
// import {
//     // updateDoc,
//     // getDoc,
//     // doc,
//     // collection,
//     // getDoc,
//     // getDocs,
//     // addDoc,
//     // deleteDoc,
//     // doc,
//     // onSnapshot,
//     // query,
//     // where
// } from "firebase/firestore";



const MedicationModal = ({ medi, setEditActive, setElementTitle, title, setElementTime, time, id, setElementId, unit, setElementUnit, dose, setElementDose, updateMedication }) => {


    // useEffect(() => {
    //     setElementId(id);
    //     setElementTitle(title);
    //     setElementId(id);
    //     setElementTime(time);
    //     console.log("useEffect --- " + title + "---" + id);
    // }
    // );


    return (

        <div /* key={medi.id} */ className="modal">

            <div>
                <button className="modal-close"
                    onClick={() => { setEditActive(false); }}>
                    <span className="material-icons-round">
                        close
                    </span>
                </button>
            </div>

            <input
                type="text"
                value={title}
                onChange={(event) => { setElementTitle(event.target.value) }}
            />
            <input
                type="text"
                value={time}
                onChange={(event) => { setElementTime(event.target.value) }}
            />
            <input
                type="text"
                value={dose}
                onChange={(event) => { setElementDose(event.target.value) }}
            />
            <input
                type="text"
                value={unit}
                onChange={(event) => { setElementUnit(event.target.value) }}
            />

            <div >
                <button onClick={(click) => { updateMedication(click, medi.id); }}>

                    <span className="material-icons-round">
                        update
                    </span>
                </button>
            </div>


        </div >


    );
}

export default MedicationModal;