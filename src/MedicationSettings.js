import React from 'react';
import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { db } from "./firebase-config";
import {
    updateDoc,
    doc
} from "firebase/firestore";






const MedicationSettings = ({ medi, setEditActive }) => {

    // const [comment, updateElementComment] = useState("");
    // const [timestamp, updateElementTimestamp] = useState("");
    const [time, updateElementTime] = useState("");
    const [title, updateElementTitle] = useState("");
    const [unit, updateElementUnit] = useState("");
    const [dose, updateElementDose] = useState("");

    // useEffect(() => {
    //     localStorage.setItem("medi", JSON.stringify(medi))
    // }, [medi]);

    // useEffect(() => {
    //     localStorage.getItem("medi", JSON.parse(medi))
    // }, [medi]);

    const [values, setValues] = useState(getFormValues);

    function getFormValues() {
        const storedValues = localStorage.getItem("medi");
        return JSON.parse(storedValues);

    }
    // updateElementTitle(values.title); //too m any re-renders, infinite loop
    console.log(values);


    // function handleChange(event) {
    //     setValues((previousValues) => ({
    //         ...previousValues,
    //         [event.target.name]: event.target.value,
    //     }))
    // }


    const updateMedication = /* async */ (click, id) => {
        click.preventDefault(); // referencing event listener onclick
        const medicationDoc = doc(db, "medication", id);
        /* await */ updateDoc(medicationDoc, {
            // comment: comment,
            // timestamp: timestamp,
            // uid: user.uid,
            // time: values.time,
            title: values.title, //speichert jetzt das aus dem local storage ab
            // unit: unit,
            // dose: dose
        });
        // updateElementComment("");
        // updateElementTimestamp("");
        updateElementTime("");
        updateElementTitle("");
        updateElementUnit("");
        updateElementDose("");
        // setEditActive(false);
    };

    // const { register, handleSubmit } = useForm();
    // const { register, handleSubmit } = useForm({
    //     defaultValues: medi
    // });



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
                // ref={register.medi}
                // {...register("title")}
                // title="title"
                defaultValue={values.title}
                // placeholder={values.title}
                type="text"
                // value={title}
                onChange={(event) => { updateElementTitle(event.target.value); }}
            // value={values.title}
            // onChange={handleChange}
            />
            <input
                // defaultValue={values.time}
                // placeholder={medi.time}
                type="text"
            // value={time}
            // onChange={(event) => { updateElementTime(event.target.value); }}
            // value={values.time}
            // onChange={handleChange}
            />



            <div className="">
                <button
                    onClick={(click) => {
                        updateMedication(click, medi.id);
                        setEditActive(false);
                    }} >

                    <span className="material-icons-round">
                        update
                    </span>
                </button>
            </div>


        </div >


    );
}

export default MedicationSettings;