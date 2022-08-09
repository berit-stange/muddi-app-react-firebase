import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import UserSettingsModal from './UserSettingsModal';


const UserSettingsElement = ({ settings }) => {

    const [editActive, setEditActive] = useState("false");
    const [id, setElementId] = useState("");
    const [time, setElementTime] = useState("");
    const [title, setElementTitle] = useState("");
    const [unit, setElementUnit] = useState("");
    const [dose, setElementDose] = useState("");

    // const deleteMedication = async (id) => {
    //     const medicationDoc = doc(db, "medication", id);
    //     await deleteDoc(medicationDoc);
    // };

    const selectMedi = () => {
        setEditActive(true);
        setElementId(settings.id);
        setElementTitle(settings.title);
        // setElementTime(settings.time);
        setElementDose(settings.dose);
        setElementUnit(settings.unit);
        // console.log("selectMedi: " + medi.title + " --- " + id);
    }

    const updateSettings = async (click, id) => {
        click.preventDefault();
        const settingsDoc = doc(db, "settings", id);
        await updateDoc(settingsDoc, {
            title: title,
            unit: unit,
            dose: dose
        });
        setEditActive(false);
        setElementTitle("");
        // setElementTime("");
    };

    const deleteSettings = async (id) => {
        const settingsDoc = doc(db, "settings", id);
        await deleteDoc(settingsDoc);
    };


    return (
        <div key={settings.id} >


            {/* <div> */}
            <p className="medi-title">{settings.title} - {/* {settings.id} */} {settings.dose} {settings.unit}</p>
            {/* </div > */}

            <div className="list-element-btn-box">

                <button onClick={() => selectMedi()} >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>



            {
                editActive === true &&
                <UserSettingsModal
                    settings={settings}
                    setEditActive={setEditActive}
                    setElementTitle={setElementTitle}
                    title={title}
                    setElementId={setElementId}
                    id={id}
                    setElementDose={setElementDose}
                    dose={dose}
                    setElementUnit={setElementUnit}
                    unit={unit}
                    updateSettings={updateSettings}
                    deleteSettings={deleteSettings}
                />
            }

        </div >
    );

}

export default UserSettingsElement; 