// react functional component called Roller

import React from 'react';
import { useState, useEffect } from 'react';
import Result from './result.js';




const Roller = ({ diePickers }) => {

    const [results, setResults] = useState(new Map());

    const [update, setUpdate] = useState(0);

    const rollDice = () => {
        // loop over diepickers and roll a d8 for each skill and a d12 for each proficiency and load results into two arrays, one for skill and one for proficiency

        


        // loop over diepickers and roll a d8 for each skill and a d12 for each proficiency and load results into two arrays, one for skill and one for proficiency
        
        Array.from(diePickers.values()).forEach((diePicker) => {
            let skillRolls = [];
            let proficiencyRolls = [];
            for (let i = 0; i < diePicker.skill; i++) {
                skillRolls.push(Math.floor(Math.random() * 8) + 1);
            }
            for (let i = 0; i < diePicker.proficiency; i++) {
                proficiencyRolls.push(Math.floor(Math.random() * 12) + 1);
            }
            setResults(results.set(diePicker.id, {name: diePicker.name, id: diePicker.id, skill: skillRolls, proficiency: proficiencyRolls, flag: Math.random()}));
        });

        setUpdate(update + 1);

        console.log(results);
        
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