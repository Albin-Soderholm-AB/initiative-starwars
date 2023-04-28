// functional component called result

import React from 'react';
import { useEffect } from 'react';

const Result = ({ result }) => {

    const nameMap = {
        0: "blank",
        1: "success",
        2: "advantage",
        3: "triumph",
    };

    const count = (outcome1, outcome2) => {
        let count = new Map();
        outcome1 = outcome1?.flat();
        outcome2 = outcome2?.flat();
        console.log(outcome1);
        console.log(outcome2);
        outcome1?.forEach((v) => {
            if (count.has(nameMap[v])) {
                count.set(nameMap[v], count.get(nameMap[v]) + 1);
            } else {
                count.set(nameMap[v], 1);
            }
        });
        outcome2?.forEach((v) => {
            if (count.has(nameMap[v])) {
                count.set(nameMap[v], count.get(nameMap[v]) + 1);
            } else {
                count.set(nameMap[v], 1);
            }
        });
        console.log(count);
        return count;
    };

    useEffect(() => {
        console.log("Resyt: " + JSON.stringify(result));
    }, [result]);

    return (
        <div>  
            <p>Picker name: {result.name}</p>
            
                {Array.of(count(result.proficiency, result.skill).entries()).forEach((k, v) => {
                    <p>{k}: {v}</p>
                })}
        </div>
    )
};

export default Result;