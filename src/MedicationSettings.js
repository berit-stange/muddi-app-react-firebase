import React from 'react';
import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { db } from "./firebase-config";
import {
    updateDoc,
    doc
} from "firebase/firestore";



const MedicationSettings = ({ medi, setEditActive/* , setElementTitle */ }) => {

    // const [comment, updateElementComment] = useState("");
    // const [timestamp, updateElementTimestamp] = useState("");
    // const [time, updateElementTime] = useState("");
    const [title, updateElementTitle] = useState("");
    // const [unit, updateElementUnit] = useState("");
    // const [dose, updateElementDose] = useState("");

    const [mediX, setMedi] = useState({});
    // const [timeSelected, setElementTime] = useState("");
    const [setTitle, setElementTitle] = useState("");
    // const [unitSelected, setElementUnit] = useState("");
    // const [doseSelected, setElementDose] = useState("");

    useEffect(() => {
        selectX();
    },
        [setTitle]
    );

    function selectX() {
        // let item=medi;
        setElementTitle(medi.title);
        console.log(setTitle + " selected");
    }

    // const selectMedi = () => {
    // setMedi(mediX);
    // console.log(mediX);
    // setElementTitle(medi.title);
    // console.log(titleSelected);
    // }

    // useEffect(() => {
    //     localStorage.setItem("medi", JSON.stringify(medi))
    // }, [medi]);

    // useEffect(() => {
    //     localStorage.getItem("medi", JSON.parse(medi))
    // }, [medi]);

    // ----------- selected medi in localstorage - sichern in db funktioniert so nicht
    // const [values, setValues] = useState(getFormValues);
    // function getFormValues() {
    //     const storedValues = localStorage.getItem("medi");
    //     return JSON.parse(storedValues);
    // }
    // updateElementTitle(values.title); //too m any re-renders, infinite loop
    // console.log(values);


    const updateMedication = /* async */ (click, id) => {
        click.preventDefault(); // referencing event listener onclick
        const medicationDoc = doc(db, "medication", id);
        /* await */ updateDoc(medicationDoc, {
            // time: values.time,
            // title: values.title, //speichert jetzt das aus dem local storage ab
            title: setTitle,
        });
        // updateElementTime("");
        updateElementTitle("");
        setEditActive(false);
    };



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
                // defaultValue={values.title}
                // placeholder={values.title}
                type="text"
                value={setTitle}
                // onChange={(event) => { updateElementTitle(event.target.value); }}
                onChange={(event) => { updateElementTitle(event.target.value) }}
            />
            {/* <input /> */}



            <div className="">
                <button
                    onClick={(click) => {
                        updateMedication(click, medi.id);
                        setEditActive(false);
                    }}
                // onClick={updateMedication} 
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