// functional component called result

import React from 'react';
import { useEffect, useState } from 'react';

const Result = ({ result }) => {

    const nameMap = {
        0: "blank",
        1: "success",
        2: "advantage",
        3: "triumph",
    };

    const [count, setCount] = useState([0, 0, 0, 0]);


    const calcCount = (outcome1, outcome2) => {

        setCount([0, 0, 0, 0]);
        for (const v of outcome1) {
            setCount(prevState => {
                let newState = prevState;
                newState[v] = newState[v] + 1;
                return newState;
            });
        }

        for (const v of outcome2) {
            setCount(prevState => {
                let newState = prevState;
                newState[v] = newState[v] + 1;
                return newState;
            });
        }
        console.log(count);
        
    };

    useEffect(() => {
        console.log("Resyt: " + JSON.stringify(result));
        calcCount(result.skill.flat(), result.proficiency.flat());
    }, [result]);

    useEffect(() => {
        console.log("Count");
        console.log(count);
    }, [count]);

    return (
        <div>  
            <p>Picker name: {result.name}</p>
            <div>
                {count.map((value, index) => (
                    <p>{nameMap[index]}: {value}</p>
                ))}
            </div>
        </div>
    )
};

export default Result;