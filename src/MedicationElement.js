import React from "react";
import { useState/* , useEffect */ } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    // getDoc,
    updateDoc
} from 'firebase/firestore';
import MedicationSettings from './MedicationSettings';


const MedicationElement = ({ medi, setEditActive, editActive }) => {

    // const [id, setElementId] = useState("");
    const [time, setElementTime] = useState("");
    const [title, setElementTitle] = useState("");
    // const [unit, setElementUnit] = useState("");
    // const [dose, setElementDose] = useState("");

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    const selectMedi = () => {
        setEditActive(true);
        // const item = medi;
        // setElementTitle(item.title);
        setElementTime(medi.time);
        setElementTitle(medi.title);
        // setElementId(medi.id);
        console.log("selectMedi: " + medi.title + " " + medi.id);
    }

    const updateMedication = async (click, id) => {
        click.preventDefault();
        const medicationDoc = doc(db, "medication", id);
        await updateDoc(medicationDoc, {
            time: time,
            title: title
        });
        setEditActive(false);
        setElementTitle("");
        setElementTime("");
    };


    return (
        <div key={medi.id} className="medi-list-item">
            <div>
                <p>{medi.time.toString()} - {medi.title} - {medi.dose} {medi.unit}</p>
            </div>

            <button onClick={() => { deleteMedication(medi.id); }} >
                <span className="material-icons-round">
                    delete
                </span>
            </button>


            <button onClick={() => selectMedi(medi.id)} >
                <span className="material-icons-round">settings</span>
            </button>



            <div key={medi.id} className="">
                <input type="text"
                    value={title}
                    onChange={(event) => { setElementTitle(event.target.value) }}
                />
                <input type="text"
                    value={time}
                    onChange={(event) => { setElementTime(event.target.value) }}
                />
                <div>
                    <button onClick={(click) => { updateMedication(click, medi.id); }} >
                        <span className="material-icons-round"> update </span>
                    </button>
                    <button onClick={() => { setEditActive(false); }} className="modal-close" >
                        <span className="material-icons-round"> close </span>
                    </button>
                </div>
            </div>

            {/* {
                editActive === true &&
                <MedicationSettings
                    key={medi.id}
                    medi={medi}
                    setEditActive={setEditActive}
                    setElementTitle={setElementTitle}
                    title={title}
                    setElementTime={setElementTime}
                    time={time}
                    setElementId={setElementId}
                    id={id}
                />
            } */}

        </div>
    );

}

export default MedicationElement; 