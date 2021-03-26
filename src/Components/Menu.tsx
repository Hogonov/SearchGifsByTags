import React, {useState} from 'react';

type Tag = {
    tag: string;
    loading: boolean;
    isGroup: boolean;
    btnText: {
        load: string,
        loading: string,
        clear: string,
        group: string,
        ungroup: string
    };
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
    clickHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const Menu: React.FunctionComponent<Tag> = ({changeHandler, clickHandler, tag, btnText, loading, isGroup}) => {

    return (<div className='menuGroup'>
        <input type='text' onChange={changeHandler} value={tag} placeholder='Введите тег'/>
        <button
            disabled={loading}
            name='load'
            className='btn green'
            onClick={clickHandler}
        >{loading? btnText.loading : btnText.load}</button>
        <button
            name='clear'
            className='btn red'
            onClick={clickHandler}
            value={btnText.clear}
        >Очистить</button>
        <button
            name='group'
            className='btn blue'
            onClick={clickHandler}
            value={btnText.group}
        >{isGroup? btnText.ungroup : btnText.group}</button>
    </div>);
}

export default Menu;
