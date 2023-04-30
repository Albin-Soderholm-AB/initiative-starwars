// react functional component called DiePicker with two state variables, skill and proficiency

import React from 'react';
import { useState, useEffect } from 'react';

const DiePicker = ({ callBack, id, show, initName, initSkill=0, initProf=0 }) => {
    const [skill, setSkill] = useState(initSkill);
    const [proficiency, setProficiency] = useState(initProf);
    const [name, setName] = useState(initName);

    useEffect(() => {
        callBack(id, skill, proficiency, name);
    }, [skill, proficiency, name, id, callBack]);

    // two inputs that increment the state variables 
    const incrementSkill = (val) => {
        setSkill(skill + val);
    }

    const incrementProficiency = (val) => {
        setProficiency(proficiency + val);
    }

    if (!show) {
        return null;
    }

    return (
        <div className='diePicker'>
            <h1><input type="text" value={name} onChange={e => setName(e.currentTarget.value)}></input></h1>

            <div className='buttonPanel'>
                <p>Skill: {skill}</p>
                <button class='button' onClick={e => incrementSkill(-1)}>-</button>
                <button class='button' onClick={e => incrementSkill(1)}>+</button>
            </div>
            <div className='buttonPanel'>
                <p>Proficiency: {proficiency}</p>
                <button class='button' onClick={e => incrementProficiency(-1)}>-</button>
                <button class='button' onClick={e => incrementProficiency(1)}>+</button>
            </div>
        </div>
    );
}

export default DiePicker;