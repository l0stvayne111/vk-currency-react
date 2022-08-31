import React from 'react';
import {
    Panel,
    PanelHeader,
    Div,
    FixedLayout,
    Button,
    PanelHeaderBack,
    Group,
    Title,
    Header,
    List, Cell, Link, SimpleCell, Avatar
} from '@vkontakte/vkui';
import {ROUTERS} from "../utils/routers";


const About = ({id, go}) => {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => go(ROUTERS.HOME_ROUTE)} />}>
                О программе
            </PanelHeader>
            <Group header={<Header mode="secondary">Исходный код</Header>}>
                <List>
                    <Cell>
                        Исходный код доступен на <Link href={''}>GitHub</Link>
                    </Cell>
                    <Cell>
                        Документация <Link href={''}>VK Apps платформы</Link>
                    </Cell>
                    <Cell>
                        Компоненты <Link href={'https://vkcom.github.io/VKUI'}>VKUI</Link>
                    </Cell>
                    <Cell>
                        Разметка <Link href={'https://getbootstrap.com/'}>Bootstrap 5</Link>
                    </Cell>
                </List>
            </Group>

            <Group header={<Header mode="secondary">Используемые ресурсы</Header>}>
                <List>
                    <Cell>
                        Курсы валют - <Link href={'https://cur.su/'}>API</Link>
                    </Cell>
                </List>
            </Group>

            <Group header={<Header mode="secondary">Разработчик</Header>}>
                <SimpleCell description={'Front-end developer'} before={<Avatar size={48} src={'https://sun1-85.userapi.com/s/v1/ig2/Xd2cJFOiHmoobyKjLqh3PxrDFalruZ2XmRJI0Cjh7lKrjrnQHrxGs7F7JdOzdm2jrcVsfxAEI9wB5DlufzkzZ0Mb.jpg?size=200x200&quality=95&crop=44,80,1672,1672&ava=1'}/>}>
                    Максимов Сергей
                </SimpleCell>
            </Group>
        </Panel>
    );
};

export default About;