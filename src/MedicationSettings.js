import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
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

    const updateMedication = /* async */ (click, id) => {
        click.preventDefault(); // referencing event listener onclick
        const medicationDoc = doc(db, "medication", id);
        /* await */ updateDoc(medicationDoc, {
            // comment: comment,
            // timestamp: timestamp,
            // uid: user.uid,
            time: time,
            title: title,
            unit: unit,
            dose: dose
        });
        // updateElementComment("");
        // updateElementTimestamp("");
        updateElementTime("");
        updateElementTitle("");
        updateElementUnit("");
        updateElementDose("");
        setEditActive(false);
    };

    // const { register, handleSubmit } = useForm();
    // const { register, handleSubmit } = useForm({
    //     defaultValues: medi
    // });

    // const selectElement = (id) => {
    //     selectTitle(medi.title, id)
    // };

    //     function selectUser(id)
    //   {
    //     let item=users[id-1];
    //     setName(item.name)
    //     setEmail(item.email)
    //     setMobile(item.mobile);
    //     setUserId(item.id)
    //   }


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


            {/* onSubmit={
                     handleSubmit((click) => {
                         updateMedication(click, medi.id)
                     })
                 } */}

            <input
                // ref={register.title}
                // {...register("title")}
                // name="title"
                defaultValue={medi.title}
                type="text"
                // value={title}
                onChange={(event) => { updateElementTitle(event.target.value); }} />
            <input
                defaultValue={medi.time}
                // placeholder={medi.time}
                type="text"
                // value={time}
                onChange={(event) => { updateElementTime(event.target.value); }} />
            <input
                // defaultValue={medi.dose}
                type="text"
            // value={dose}
            // onChange={(event) => {
            //     updateElementDose(event.target.value);
            // }}
            />
            <input
            // defaultValue={medi.unit}
            // type="text"
            // value={unit}
            // onChange={(event) => {
            //     updateElementUnit(event.target.value);
            // }}
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