import React, {ChangeEvent, FC, useState} from 'react';
import s from "./createForm.module.css";
import clsx from "clsx";
import {NotesType, useZustand} from "../../store/zustandStore";
import {v1} from 'uuid'
import {Button, Flex, Input} from "antd";
import HashTag from "../hashTag/hashTag";

type PropsType = {
    setNotes: (value: any) => any,
    notes: NotesType[]
}
const CreateForm: FC<PropsType> = ({notes, setNotes}) => {
    const [error, setError] = useState<boolean>(false)
    const [hashMessage, setHashMessage] = useState('')
    const [hashtag, setHashtag] = useState('')

    const classNameCreateForm = {
        classNameInput: clsx(s.createNew, error && s.error),
        classNameHashTag: clsx(s.createNew, error && s.error),
        classNameMessage: clsx(s.errorMessage)
    }
    const errorMessage = "Please add hash-tag #"
    const {addNotes} = useZustand()

    const notesHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let message = e.currentTarget.value
        const indexHashtag = message.indexOf('#')
        let hashtagMessage = message.slice(indexHashtag)

        if (indexHashtag === -1) {
            setError(true)
            setHashMessage(message)
        } else {
            setError(false)
            setHashMessage(message)
            setHashtag(hashtagMessage)
        }
    }
    const saveHandler = () => {
        const indexHashtag = hashMessage.indexOf('#')
        let noteMessage = hashMessage.slice(0, indexHashtag)
        let newNotes = {id: v1(), hashTag: hashtag, notes: noteMessage}
        addNotes(newNotes)
        notes.push(newNotes)
        setNotes(notes)
        setHashMessage('')
        setHashtag('')
    }

    const KeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!error && e.charCode === 13) {
            saveHandler()
        }
    }

    return (
        <div className={s.createTag}>
            <div className={s.inputField}>
                <Flex>Create notes</Flex>
                <div className={s.inputButton}>
                    <Input value={hashMessage} onChange={notesHandler} placeholder='New notes'
                           className={classNameCreateForm.classNameInput}
                           onKeyPress={KeyDownHandler}/>
                    <Button disabled={!hashtag || error} onClick={saveHandler} type="primary" ghost>Save</Button>
                </div>
                {!error && <HashTag hashTag={hashtag}/>}
                <div className={classNameCreateForm.classNameMessage}>{error && errorMessage}</div>
            </div>

        </div>
    );
};

export default CreateForm;