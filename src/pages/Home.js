import React, {useEffect} from 'react';

import {
    Panel,
    PanelHeader,
    Div,
    Button,
    CardScroll,
    Card,
    Group,
    CardGrid,
    Text, Spacing, Title, FormLayout, FormItem, Input, FormLayoutGroup, Select, FixedLayout, CellButton, View
} from '@vkontakte/vkui';
import CurrencyCard from "../components/CurrencyCard";
import {useInput} from "../hooks/useInput";
import {ROUTERS} from "../utils/routers";
import CurrencyRow from "../components/CurrencyRow";


const currencyData = [
    {
        id: 1,
        title: 'Доллар',
        value: 60,
        sign: '$',
    },
    {
        id: 2,
        title: 'Евро',
        value: 61,
        sign: '€',
    },
    {
        id: 3,
        title: 'Фунт',
        value: 62,
        sign: '£',
    }
]

const Home = ({id, go, snackbarError, rates}) => {

    const from = useInput(1);
    const to = useInput(0);

    const fromCurrency = useInput('USD');
    const toCurrency = useInput('RUB');


    const handleOnFrom = (value) => {
        const result = ((value / rates[fromCurrency.value]) * rates[toCurrency.value]).toFixed(4);
        from.setValue(value);
        to.setValue(result);
    }

    const handleOnTo= (value) => {
        const result = (rates[fromCurrency.value] / rates[toCurrency.value]) * value;
        from.setValue(result)
        to.setValue(value)
    }

    useEffect(() => {
        handleOnFrom(from.value)
    }, [fromCurrency.value, toCurrency.value]);



    return (
        <Panel id={id}>
            <PanelHeader>
                Курсы валют
            </PanelHeader>
            <Group description={'Текущий курс валют'}>
                <CardScroll size={'s'}>
                    {
                        Object.keys(rates).filter(k => k === 'USD' || k === 'EUR' || k === 'GBP').map((c, i) => (
                            <React.Fragment key={i}>
                                <CurrencyCard title={c} value={((1 / rates[c]) * rates['RUB']).toFixed(3)} />
                            </React.Fragment>
                        ))
                    }
                </CardScroll>
            </Group>
            <Group>
                <CardGrid size={'l'}>
                   <Card>
                       <Div>
                          <Text>Калькулятор</Text>
                           <Spacing size={16}/>
                           <Title level={3}>
                               Курс: 1 {fromCurrency.value} = {((1 / rates[fromCurrency.value]) * rates[toCurrency.value]).toFixed(3)} {toCurrency.value}
                           </Title>
                           <Spacing size={16}/>
                           <CurrencyRow
                               currency={fromCurrency.value}
                               disabled={false}
                               value={from.value}
                               onChangeValue={handleOnFrom}
                               onChangeCurrency={fromCurrency.onChange}
                           />
                           <Spacing size={16}/>
                           <CurrencyRow
                               currency={toCurrency.value}
                               disabled={true}
                               value={to.value}
                               onChangeValue={handleOnTo}
                               onChangeCurrency={toCurrency.onChange}
                           />
                       </Div>
                   </Card>
                </CardGrid>
            </Group>
            <FixedLayout filled vertical="bottom">
                <Div>
                    <CellButton centered onClick={() => go(ROUTERS.ABOUT_ROUTE)}>
                        О программе
                    </CellButton>
                </Div>
            </FixedLayout>
            {snackbarError}
        </Panel>
    );
};

export default Home;