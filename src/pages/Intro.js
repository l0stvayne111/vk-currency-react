import React from 'react';

import {Panel, PanelHeader, Div, FixedLayout, Button} from '@vkontakte/vkui';
import UserIntro from "../components/UserIntro";
import {ROUTERS} from "../utils/routers";



const Intro = ({id, fetchedUser, go}) => {

    const handleOnClick = () => go(ROUTERS.HOME_ROUTE);

    return (
        <Panel id={id} centered={true}>
            <PanelHeader>
                Курсы валют
            </PanelHeader>
            {fetchedUser && <React.Fragment>
                <UserIntro name={fetchedUser.first_name} photo={fetchedUser.photo_200}/>
            </React.Fragment>}
            <FixedLayout filled vertical="bottom">
                <Div>
                    <Button onClick={handleOnClick} size={'l'} mode={'commerce'} stretched={true}>
                        OK, все понятно
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};

export default Intro;