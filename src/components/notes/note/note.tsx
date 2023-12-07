import React, {ChangeEvent, FC, useState} from 'react';
import s from "./note.module.css";
import {NotesType, useZustand} from "../../../store/zustandStore";
import EditButtons from "./editButtons/editButtons";
import clsx from "clsx";
import {Flex, Input} from "antd";

const {TextArea} = Input;

type PropsType = {
    note: NotesType
    setNotes: any
    notes: NotesType[]
}
const Note: FC<PropsType> = ({note, setNotes, notes}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [editNote, setEditNote] = useState(note.notes)
    const [editHashTag, setEditHashTag] = useState(note.hashTag)
    const [error, setError] = useState<boolean>(false)

    const className = clsx(s.editNote, error && s.error)
    const {changeNotes, removeNotes} = useZustand()

    const openHandler = () => {
        setOpen(true)
    }
    const closeHandler = (id: string) => {
        setOpen(false)
        saveEditNote(id)
    }
    const deleteHandler = (id: string) => {
        removeNotes(id)
        setNotes(notes.filter(t => t.id !== id))
        let localStorageValue = localStorage.getItem('notes')
        if (localStorageValue) {
            const lostItems = JSON.parse(localStorageValue).filter((t: NotesType) => t.id !== id)
            localStorage.setItem('notes', JSON.stringify(lostItems))
        }
    }
    const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let editMessage = (e.currentTarget.value)
        setEditNote(editMessage)
        setError(false)
    }
    const handleChangeHashTag = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let editMessage = (e.currentTarget.value)
        let indexHashtag = editMessage.indexOf('#')
        let hashtagMessage = editMessage.slice(indexHashtag)
        if (indexHashtag === -1) {
            setError(true)
            setEditHashTag(hashtagMessage)
        } else {
            setError(false)
            setEditHashTag(hashtagMessage)
        }
    }

    const saveEditNote = (id: string) => {
        let newNotes = {id, hashTag: editHashTag, notes: editNote}
        changeNotes(newNotes)
        setNotes(notes.map(t => t.id === id ? newNotes : t))
    }

    const KeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: string) => {
        if (!error && e.charCode === 13) {
            saveEditNote(id)
            setOpen(false)
        }
    }
    return (
        <>
            {open
                ? <Flex className={className} onDoubleClick={() => closeHandler(note.id)}>
                    <Flex className={s.idEdit}>
                        <TextArea value={editHashTag} onChange={handleChangeHashTag}
                                  onKeyPress={(e) => KeyDownHandler(e, note.id)}/>
                        <EditButtons disabled={error} title={'Save'} id={note.id} deleteHandler={deleteHandler}
                                     saveEditNote={() => saveEditNote(note.id)}
                                     changeHandler={() => closeHandler(note.id)}/>
                    </Flex>
                    <Flex className={s.noteHashMessage}>
                        <TextArea value={editNote} onChange={handleChangeNote} disabled={error}
                                  onKeyPress={(e) => KeyDownHandler(e, note.id)}/>
                    </Flex>
                </Flex>
                : <Flex className={s.note} onDoubleClick={openHandler}>
                    <div>
                        <Flex className={s.id}>{note.hashTag}</Flex>
                        <EditButtons title={'Edit'} id={note.id} deleteHandler={deleteHandler}
                                     changeHandler={openHandler}/>
                    </div>
                    <Flex className={s.noteHashMessage}>
                        <Flex className={s.noteMessage}>{note.notes}</Flex>
                    </Flex>

                </Flex>}
        </>
    );
};

export default Note;