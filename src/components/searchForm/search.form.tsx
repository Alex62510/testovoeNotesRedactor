import React, {ChangeEvent, FC} from 'react';
import s from "./searchForm.module.css";
import {useZustand} from "../../store/zustandStore";
import {Input, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {search} from "../../utils/filtredNotes";

type PropsType = {
    setNotes: any
}
const SearchForm: FC<PropsType> = ({setNotes}) => {
    const {notesWithTag} = useZustand()

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNotes(search(event.target.value,notesWithTag))
    }
    return (
        <div className={s.searchForm}>
            <div>Search notes</div>
            <Space.Compact size="middle">
                <Input style={{ backgroundColor: "white"}} addonAfter={<SearchOutlined/>}
                       placeholder="Search" onChange={handleChange}/>
            </Space.Compact>
        </div>
    )
        ;
};
export default SearchForm;