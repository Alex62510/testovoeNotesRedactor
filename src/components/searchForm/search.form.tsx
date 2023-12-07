import React, {ChangeEvent, FC} from 'react';
import s from "./searchForm.module.css";
import {NotesType, useZustand} from "../../store/zustandStore";
import {Flex, Input, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {search} from "../../utils/filtredNotes";

type PropsType = {
    setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>
}
const SearchForm: FC<PropsType> = ({setNotes}) => {
    const {notesWithTag} = useZustand()

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNotes(search(event.target.value, notesWithTag))
    }
    return (
        <div className={s.searchForm}>
            <Flex>Search notes</Flex>
            <Space.Compact size="middle">
                <Input style={{backgroundColor: "white"}} addonAfter={<SearchOutlined/>}
                       placeholder="Search" onChange={handleChange}/>
            </Space.Compact>
        </div>
    )
        ;
};
export default SearchForm;