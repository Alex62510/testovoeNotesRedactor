import s from "./notes.module.css";
import {NotesType} from "../../store/zustandStore";
import Note from "./note/note";
import {FC} from "react";

type PropsType ={
    notes:NotesType[]
    setNotes:any
}
const Notes:FC<PropsType> = ({notes,setNotes}) => {
    return (
        <div className={s.tagsTable}>

            {notes.map((t, index) => (
                <Note note={t} key={index} setNotes={setNotes} notes={notes}/>
            ))
            } </div>
    );
};

export default Notes;