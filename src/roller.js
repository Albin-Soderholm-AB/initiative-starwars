// react functional component called Roller

import React from 'react';
import { useState, useEffect } from 'react';
import Result from './result.js';




const Roller = ({ diePickers, callBack, showResult }) => {

    const [results, setResults] = useState(new Map());

    const [update, setUpdate] = useState(0);

    const blank = 3;
    const success = 1;
    const advantage = 2;
    const triumph = 0;


    const skillMap = [blank, success, success, [success, success], advantage, advantage, [success, advantage], [advantage, advantage]];
    const proficiencyMap = [blank, success, success, [success, success], [success, success], advantage, [success, advantage], [success, advantage], [success, advantage], [advantage, advantage], [advantage, advantage], triumph];


    const mapSkillToSwDice = (dieRolls) => {
        return dieRolls.map(v => skillMap[v]);
    };

    const mapProfToSwDice = (dieRolls) => {
        return dieRolls.map(v => proficiencyMap[v]);
    };

    const calcCount = (outcome1, outcome2) => {
        let count = [0, 0, 0, 0];
        for (const v of outcome1) {
            count[v] = count[v] + 1;
        }

        for (const v of outcome2) {
            count[v] = count[v] + 1;
        }
        
        return count;
        
    };

    const rollDice = () => {
        
        Array.from(diePickers.values()).forEach((diePicker) => {
            let skillRolls = [];
            let proficiencyRolls = [];

            if (diePicker.skill === 0 && diePicker.proficiency === 0) {
                return;
            }

            for (let i = 0; i < diePicker.skill; i++) {
                skillRolls.push(Math.floor(Math.random() * 8));
            }
            for (let i = 0; i < diePicker.proficiency; i++) {
                proficiencyRolls.push(Math.floor(Math.random() * 12));
            }

            setResults(results.set(diePicker.id, {name: diePicker.name, id: diePicker.id, rolls: calcCount(mapSkillToSwDice(skillRolls), mapProfToSwDice(proficiencyRolls)), flag: Math.random()}));
        });

        setUpdate(update + 1);
        callBack();
        
    }

    const sortFunc = (res1, res2) => {
        let rolls1 = res1.rolls;
        let rolls2 = res2.rolls;

        if (rolls1[3] + rolls1[1] > rolls2[3] + rolls2[1]) {
            return -1;
        } else if (rolls1[3] + rolls1[1] < rolls2[3] + rolls2[1]) {
            return 1;
        } else if (rolls1[2] > rolls2[2]) {
            return -1;
        } else if (rolls1[2] < rolls2[2]) {
            return 1;
        } else if (rolls1[3] > rolls2[3]) {
            return -1;
        } else if (rolls1[3] < rolls2[3]) {
            return 1;
        } else {
            return -1;
        }
    };

    useEffect(() => {
    }, [diePickers, results, update]);

    if (showResult) {
        return (
            <div>
                <h1>Result</h1>
                <div>
                {Array.from(results.values()).sort(sortFunc).map((result) => (
                    
                    <Result result={result} key={result.id}></Result>
                    
                ))}
                </div>
            </div>
        );
    } else {
        return (
            <div>
            <button onClick={rollDice}>Roll</button>
            </div>
        );
    }
}

// export default Roller;
export default Roller;