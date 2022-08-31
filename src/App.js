import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    View,
    ScreenSpinner,
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    SplitLayout,
    SplitCol,
    Snackbar, Avatar, Div, CellButton, FixedLayout, Footer
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24Error } from '@vkontakte/icons';

import Home from './pages/Home';
import {ROUTERS} from "./utils/routers";
import {SRORAGE_KEYS} from "./utils/storageKeys";

import Intro from "./pages/Intro";
import About from "./pages/About";

const App = () => {
    const [scheme, setScheme] = useState('bright_light')
    const [activePanel, setActivePanel] = useState(ROUTERS.INTRO_ROUTE);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [isSeeIntro, setIsSeeIntro] = React.useState(false);
    const [snackBar, setSnackBar] = React.useState(false)


    const [rates, setRates] = React.useState({})


    React.useEffect(() => {
        async function load() {
            try {
                await fetch('https://cdn.cur.su/api/latest.json')
                    .then(r => r.json())
                    .then(json => setRates(json.rates))
            } catch (e) {
                setSnackBar(<Snackbar
                    duration={900}
                    onClose={() => setSnackBar(null)}
                    before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic-red)'}}>
                        <Icon24Error fill='#fff' width={14} height={14}/>
                    </Avatar>}
                    layout={"vertical"}>Проблема с курсами</Snackbar>)
            }
        }
        load();
    }, [])

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme)
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            const storageData = await bridge.send('VKWebAppStorageGet', {
                keys: Object.values(SRORAGE_KEYS)
            })
            setUser(user);
            setPopout(null);
        }

        fetchData();
    }, []);

    const go = panel => {
        setActivePanel(panel);
    };


    // const viewIntro = async function() {
    //     try {
    //         await bridge.send('VKWebAppStorageSet', {
    //             key: SRORAGE_KEYS.STATUS, value: JSON.stringify({
    //                 hasSeeIntro: true
    //             })
    //         })
    //         go(ROUTERS.HOME_ROUTE)
    //     } catch (e) {
    //         setSnackBar(<Snackbar
    //             duration={900}
    //             onClose={() => setSnackBar(null)}
    //             before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic-red)'}}>
    //                 <Icon24Error fill='#fff' width={14} height={14}/>
    //             </Avatar>}
    //             layout={"vertical"}>Проблема с отправкой в localStorage</Snackbar>)
    //     }
    // }

    return (

        <ConfigProvider appearance="dark">
            <AppRoot>
                <View activePanel={activePanel} popout={popout}>
                    <Intro
                        fetchedUser={fetchedUser}
                        go={go}
                        id={ROUTERS.INTRO_ROUTE}/>
                    <Home
                        snackbarError={snackBar}
                        rates={rates}
                        id={ROUTERS.HOME_ROUTE}
                        go={go}/>
                    <About
                        id={ROUTERS.ABOUT_ROUTE}
                        go={go}
                    />
                </View>
            </AppRoot>
        </ConfigProvider>
    );
}

export default App;
