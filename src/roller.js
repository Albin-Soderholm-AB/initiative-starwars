// react functional component called Roller

import React from 'react';
import { useState, useEffect } from 'react';
import Result from './result.js';
import { saveState, getState } from './api/api.js';




const Roller = ({ diePickers, callBack, showResultInit, useStorage = false }) => {

    const [results, setResults] = useState(new Map());

    const [update, setUpdate] = useState(0);

    const [lockOut, setLockOut] = useState(false);

    const [showResult, setShowResult] = useState(showResultInit);

    const [waiting, setWaiting] = useState(false);

    const blank = 3;
    const success = 1;
    const advantage = 2;
    const triumph = 0;


    const abilityMap = [blank, success, success, [success, success], advantage, advantage, [success, advantage], [advantage, advantage]];
    const proficiencyMap = [blank, success, success, [success, success], [success, success], advantage, [success, advantage], [success, advantage], [success, advantage], [advantage, advantage], [advantage, advantage], triumph];
    const boostMap = [success, [advantage, advantage], [advantage, success], blank, blank, advantage];

    const mapAbilityToSwDice = (dieRolls) => {
        return dieRolls.map(v => abilityMap[v]).flat();
    };

    const mapProfToSwDice = (dieRolls) => {
        return dieRolls.map(v => proficiencyMap[v]).flat();
    };

    const mapBoostToSwDice = (dieRolls) => {
        return dieRolls.map(v => boostMap[v]).flat();
    };

    const calcCount = (outcome1, outcome2, outcome3) => {
        let count = [0, 0, 0, 0];
        for (const v of outcome1) {
            count[v] = count[v] + 1;
        }

        for (const v of outcome2) {
            count[v] = count[v] + 1;
        }

        for (const v of outcome3) {
            count[v] = count[v] + 1;
        }

        return count;

    };

    

    const rollDice = () => {

        Array.from(diePickers.values()).forEach((diePicker) => {
            let abilityRolls = [];
            let proficiencyRolls = [];
            let boostRolls = [];

            if (diePicker.ability === 0 && diePicker.proficiency === 0 && diePicker.boost === 0) {
                return;
            }

            for (let i = 0; i < diePicker.ability; i++) {
                abilityRolls.push(Math.floor(Math.random() * 8));
            }
            for (let i = 0; i < diePicker.proficiency; i++) {
                proficiencyRolls.push(Math.floor(Math.random() * 12));
            }
            for (let i = 0; i < diePicker.boost; i++) {
                boostRolls.push(Math.floor(Math.random() * 6));
            }

            setResults(results.set(diePicker.id, {
                name: diePicker.name, type: diePicker.type, id: diePicker.id,
                rolls: calcCount(mapAbilityToSwDice(abilityRolls), mapProfToSwDice(proficiencyRolls), mapBoostToSwDice(boostRolls)),
                abilityDice: diePicker.ability, profDice: diePicker.proficiency, boostDice: diePicker.boost
            }));
        });
        saveState(Object.fromEntries(results));
        setShowResult(true);
        setUpdate(update + 1);
        callBack();

    }

    const sortFunc = (res1, res2) => {
        let rolls1 = res1.rolls;
        let rolls2 = res2.rolls;

        if (rolls1[triumph] + rolls1[success] > rolls2[triumph] + rolls2[success]) {
            return -1;
        } else if (rolls1[triumph] + rolls1[success] < rolls2[triumph] + rolls2[success]) {
            return 1;
        } else if (rolls1[advantage] > rolls2[advantage]) {
            return -1;
        } else if (rolls1[advantage] < rolls2[advantage]) {
            return 1;
        } else if (rolls1[triumph] > rolls2[triumph]) {
            return -1;
        } else if (rolls1[triumph] < rolls2[triumph]) {
            return 1;
        } else {
            return -1;
        }
    };

    useEffect(() => {
        const fetchResults = () => {
            setLockOut(true);
            setWaiting(true);
            getState().then((apiResult) => {
                console.log("API Result entries");
                console.log(Object.entries(apiResult));
                if (apiResult.size !== 0) {
                    setResults(new Map(Object.entries(apiResult)));
                    setShowResult(true);
                    console.log("Results found in storage");
                    console.log(results);
                    callBack();
                } else {
                    console.log("No results found in storage");
                    setLockOut(false);
                }
                setWaiting(false);
            });
        };

        if (useStorage && !lockOut) {
            if (results.size === 0) {
                fetchResults();
            }
        }
    }, [diePickers, results, update, showResult, showResultInit, useStorage, lockOut, callBack]);


    if (waiting) {
        return (
            <div>
                <div>
                    <p>Waiting for results...</p>
                </div>
            </div>
        );
    }
    if (showResult) {
        return (
            <div>
                <div>
                    {Array.from(results.values()).sort(sortFunc).map((result) => (

                        <Result result={result} key={result.id}></Result>

                    ))}
                </div>
            </div>
        );
    } else if (!useStorage) {
        return (
            <div>
                <button className='button' onClick={rollDice}>Roll</button>
            </div>
        );
    }
}

// export default Roller;
export default Roller;