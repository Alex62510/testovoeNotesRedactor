import React, {useEffect, useState} from 'react';
import './App.css'
import s from './styles/main.module.css'
import SearchForm from "./components/searchForm/search.form";
import CreateForm from "./components/createForm/createForm";
import Notes from "./components/notes/notes";
import {NotesType, useZustand} from "./store/zustandStore";
import {Flex} from "antd";

function App() {
    const {addNotesWithTag, notesWithTag} = useZustand()
    const [notes, setNotes] = useState<NotesType[]>(notesWithTag)

    useEffect(() => {
        let valueAsObj = localStorage.getItem('notes')
        if (valueAsObj) {
            const value = JSON.parse(valueAsObj)
            addNotesWithTag(value)
            setNotes(value)
        }
    }, [])
    let empty = notes.length>0 && notesWithTag.length>0

    return (
        <div className="App">
            <div className={s.container}>
                <h1 className={s.title}>Notes Redactor</h1>
                <Flex className={s.tagsPage}>
                    <CreateForm setNotes={setNotes} notes={notes}/>
                    <SearchForm setNotes={setNotes}/>
                </Flex>
                <div>
                    {empty && <Flex className={s.titleTable}>
                        <Flex>HashTag</Flex>
                        <Flex>Message</Flex>
                    </Flex>}
                    <div className={s.notesTable}>
                        <Notes notes={notes} setNotes={setNotes}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
