import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import BloodPressureModal from './BloodPressureModal';


const BloodPressureElement = ({ bloodPressure }) => {

    const [editActive, setEditActive] = useState("false");
    const [id, setElementId] = useState("");
    const [time, setElementTime] = useState("");
    const [title, setElementTitle] = useState("");
    const [unit, setElementUnit] = useState("");
    const [dose, setElementDose] = useState("");

    const deleteBloodPressure = async (id) => {
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureDoc);
    };

    const selectBloodPressure = () => {
        setEditActive(true);
        setElementId(bloodPressure.id);
        setElementTitle(bloodPressure.title);
        setElementTime(bloodPressure.time);
        setElementDose(bloodPressure.dose);
        setElementUnit(bloodPressure.unit);
        console.log("selectMedi: " + bloodPressure.title);
    }

    const updateBloodPressure = async (click, id) => {
        click.preventDefault();
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await updateDoc(bloodPressureDoc, {
            time: time,
            title: title,
            dose: dose,
            unit: unit
        });
        setEditActive(false);
        setElementTitle("");
        setElementId("");
    };


    return (
        <div key={bloodPressure.id} className="medi-list-item">

            <div>
                <p>{bloodPressure.time.toString()}</p>
                <p>{bloodPressure.value1} / {bloodPressure.value2}</p>
            </div>

            <div className="list-element-btn-box">
                {/* <button onClick={() => { deleteMedication(medi.id); }} >
                    <span className="material-icons-round">
                        delete
                    </span>
                </button> */}

                <button onClick={() => selectBloodPressure()} >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>



            {
                editActive === true &&
                <BloodPressureModal
                    bloodPressure={bloodPressure}
                    setEditActive={setEditActive}
                    setElementTitle={setElementTitle}
                    title={title}
                    setElementTime={setElementTime}
                    time={time}
                    setElementId={setElementId}
                    id={id}
                    setElementDose={setElementDose}
                    dose={dose}
                    setElementUnit={setElementUnit}
                    unit={unit}
                    updateBloodPressure={updateBloodPressure}
                    deleteBloodPressure={deleteBloodPressure}
                />
            }

        </div>
    );

}

export default BloodPressureElement; 