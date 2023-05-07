// react functional component called DiePicker with two state variables, skill and proficiency

import React from 'react';
import { useState, useEffect } from 'react';

const DiePicker = ({ callBack, id, show, initName, initSkill=0, initProf=0, initEnv=0, initType="enemy" }) => {
    const [skill, setSkill] = useState(initSkill);
    const [proficiency, setProficiency] = useState(initProf);
    const [boost, setBoost] = useState(initEnv);
    const [name, setName] = useState(initName);
    const [type, setType] = useState(initType);
    const [showBoostDice, setShowBoostDice] = useState(false);

    useEffect(() => {
        callBack(id, skill, proficiency, boost, name, type);
    }, [skill, proficiency, boost, name, id, callBack, type]);

    // two inputs that increment the state variables 
    const incrementSkill = (val) => {
        setSkill(skill + val);
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
                <p>Skill: {skill}</p>
                <button className='button' onClick={e => incrementSkill(-1)}>-</button>
                <button className='button' onClick={e => incrementSkill(1)}>+</button>
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