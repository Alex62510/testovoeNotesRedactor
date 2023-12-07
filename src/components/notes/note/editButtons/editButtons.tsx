import React, {FC} from 'react';
import { Button } from 'antd';
import s from './editButtons.module.css'

type PropsType = {
    title: string
    id: string
    changeHandler: () => void
    deleteHandler: (id: string) => void
    disabled?: boolean
    saveEditNote?: () => void
}
const EditButtons: FC<PropsType> = ({title, id, deleteHandler, changeHandler, disabled, saveEditNote}) => {

    const buttonClickHandler = () => {
        changeHandler()
        if (saveEditNote) {
            saveEditNote()
        }
    }
    return (
        <div className={s.buttons}>
            <Button onClick={buttonClickHandler} type="primary" ghost style={{ width: '50%' }}
                    disabled={disabled}>{title}</Button>
            <Button onClick={() => deleteHandler(id)}  style={{ width: '50%' }} type="primary" ghost danger>Delete</Button>
        </div>
    );
};

export default EditButtons;