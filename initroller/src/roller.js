// react functional component called Roller

import React from 'react';
import { useState, useEffect } from 'react';
import Result from './result.js';




const Roller = ({ diePickers }) => {

    const [results, setResults] = useState(new Map());

    const [update, setUpdate] = useState(0);

    const blank = 0;
    const success = 1;
    const advantage = 2;
    const triumph = 3;


    const skillMap = [blank, success, success, [success, success], advantage, advantage, [success, advantage], [advantage, advantage]];
    const proficiencyMap = [blank, success, success, [success, success], [success, success], advantage, [success, advantage], [success, advantage], [success, advantage], [advantage, advantage], [advantage, advantage], triumph];


    const mapSkillToSwDice = (dieRolls) => {
        return dieRolls.map(v => skillMap[v]);
    };

    const mapProfToSwDice = (dieRolls) => {
        return dieRolls.map(v => proficiencyMap[v]);
    };

    const rollDice = () => {
        
        Array.from(diePickers.values()).forEach((diePicker) => {
            let skillRolls = [];
            let proficiencyRolls = [];
            for (let i = 0; i < diePicker.skill; i++) {
                skillRolls.push(Math.floor(Math.random() * 8));
            }
            for (let i = 0; i < diePicker.proficiency; i++) {
                proficiencyRolls.push(Math.floor(Math.random() * 12));
            }
            setResults(results.set(diePicker.id, {name: diePicker.name, id: diePicker.id, skill: mapSkillToSwDice(skillRolls), proficiency: mapProfToSwDice(proficiencyRolls), flag: Math.random()}));
        });

        setUpdate(update + 1);
        
    }

    useEffect(() => {
    }, [diePickers, results, update]);

    return (
        <div>
            <h1>Result</h1>
            <div>
            {Array.from(results.values()).map((result) => (
                
                <Result result={result} key={result.id}></Result>
                
            ))}
            </div>

            <h1>Roller</h1>
            {Array.from(diePickers.values()).map((diePicker) => (
                <div>
                    <p>{diePicker.name}</p>
                    <p>{diePicker.skill}</p>
                    <p>{diePicker.proficiency}</p>
                </div>
            ))};
            <button onClick={rollDice}>Roll</button>
        </div>
    );
}

// export default Roller;
export default Roller;