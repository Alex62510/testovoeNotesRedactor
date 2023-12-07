import React, {FC} from 'react';
import s from './hashTag.module.css'
import {Flex} from "antd";
type PropsType={
    hashTag?:string
}
const HashTag:FC<PropsType> = ({hashTag}) => {
    return (
        <div className={s.table}>
            <Flex className={s.title}>HashTag: </Flex>
            <Flex className={s.hashTag}>{hashTag}</Flex>
        </div>
    );
};

export default HashTag;