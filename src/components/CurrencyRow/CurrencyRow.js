import React from 'react';
import {Input, Select} from "@vkontakte/vkui";

const defaultCurrencies = ['RUB', 'USD', 'EUR']

const CurrencyRow = ({value, currency, onChangeValue, onChangeCurrency, disabled = false}) => {


    return (
        <div className={'row g-2'}>
            <div className="col">
                <Input
                    disabled={disabled}
                    type={'number'}
                    name={'from'}
                    value={value}
                    onChange={e => onChangeValue(e.target.value)} />
            </div>
            <div className={'col-auto'}>
                <Select
                    onChange={onChangeCurrency}
                    value={currency}
                    options={defaultCurrencies.map(a => {return {value: a, label: a}})}
                />
            </div>
        </div>
    );
};

export default CurrencyRow;