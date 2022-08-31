import React from 'react';
import {Card, ContentCard, Div, Spacing, Text, Title} from "@vkontakte/vkui";
import style from './index.module.css';

const CurrencyCard = ({title, value}) => {
    return (
        <Card>
            <Div className={style.container}>
                <Text>{title}</Text>
                <Title level={1} weight={1}>{value}</Title>
            </Div>
        </Card>

    );
};

export default CurrencyCard;