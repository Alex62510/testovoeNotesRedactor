import React, {FC} from 'react';
import s from './hashTag.module.css'
type PropsType={
    hashTag?:string
}
const HashTag:FC<PropsType> = ({hashTag}) => {
    return (
        <div className={s.table}>
            <div className={s.title}>HashTag: </div>
            <span className={s.hashTag}>{hashTag}</span>
        </div>
    );
};

export default HashTag;