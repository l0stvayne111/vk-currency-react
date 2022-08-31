import React from 'react';
import style from './index.module.css';
import {Avatar, Div} from "@vkontakte/vkui";


const UserIntro = ({photo, name}) => {
    return (
        <Div className={style.container}>
            {photo && <Avatar size={80} src={photo}/>}
            <h2>Привет, {name}!</h2>
            <h3>Это mini app для просмотра курсов валют и их расчета</h3>
        </Div>
    );
};

export default UserIntro;