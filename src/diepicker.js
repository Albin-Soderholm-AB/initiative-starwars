// react functional component called DiePicker with two state variables, ability and proficiency

import React from 'react';
import { useState, useEffect } from 'react';

const DiePicker = ({ callBack, id, show, initName, initAbility=0, initProf=0, initEnv=0, initType="enemy" }) => {
    const [ability, setAbility] = useState(initAbility);
    const [proficiency, setProficiency] = useState(initProf);
    const [boost, setBoost] = useState(initEnv);
    const [name, setName] = useState(initName);
    const [type, setType] = useState(initType);
    const [showBoostDice, setShowBoostDice] = useState(false);

    useEffect(() => {
        callBack(id, ability, proficiency, boost, name, type);
    }, [ability, proficiency, boost, name, id, callBack, type]);

    // two inputs that increment the state variables 
    const incrementAbility = (val) => {
        setAbility(ability + val);
    }

    const incrementProficiency = (val) => {
        setProficiency(proficiency + val);
    }

    const incrementBoost = (val) => {
        setBoost(boost + val);
    }

    if (!show) {
        return null;
    }

    return (
        <div className='diePicker'>
            <div className="metainfo" onClick={() => setShowBoostDice(!showBoostDice)}>
                <p><input type="text" value={name} onClick={(event) => event.stopPropagation()} onChange={e => setName(e.currentTarget.value)}></input></p>
                <input type="checkbox" checked={type === "ally"} onClick={(event) => event.stopPropagation()} onChange={e => setType(e.currentTarget.checked ? "ally" : initType)}></input>
            </div>
            <div className='buttonPanel'>
                <p>Ability: {ability}</p>
                <button className='button' onClick={e => incrementAbility(-1)}>-</button>
                <button className='button' onClick={e => incrementAbility(1)}>+</button>
            </div>
            <div className='buttonPanel'>
                <p>Proficiency: {proficiency}</p>
                <button className='button' onClick={e => incrementProficiency(-1)}>-</button>
                <button className='button' onClick={e => incrementProficiency(1)}>+</button>
            </div>
            {showBoostDice && (
                <div className='buttonPanel'>
                    <p>Boost: {boost}</p>
                    <button className='button' onClick={e => incrementBoost(-1)}>-</button>
                    <button className='button' onClick={e => incrementBoost(1)}>+</button>
                </div>
            )}
        </div>
    );
}

export default DiePicker;