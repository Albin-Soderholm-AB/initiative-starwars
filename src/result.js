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

    useEffect(() => {
        console.log("Resyt: " + JSON.stringify(result));
    }, [result]);


    return (
        <div>  
            <p>Picker name: {result.name}</p>
            <div>
                {result.rolls.map((value, index) => (
                    <p>{nameMap[index]}: {value}</p>
                ))}
            </div>
        </div>
    )
};

export default Result;