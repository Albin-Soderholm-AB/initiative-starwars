// functional component called result

import React from 'react';
import { useEffect } from 'react';

import blank from './assets/images/blank.png';
import success from './assets/images/success.png';
import advantage from './assets/images/advantage.png';
import triumph from './assets/images/triumph.png';


const Result = ({ result }) => {

    const nameMap = {
        0: blank,
        1: success,
        2: advantage,
        3: triumph
    };

    useEffect(() => {
        console.log("Resyt: " + JSON.stringify(result));
    }, [result]);


    return (
        <div>  
            <p>{result.name}</p>
            <div>
                {result.rolls.map((value, index) => (

                    // img tag that displays the advantage image

                    <div className='displayDice'><img src={nameMap[index]} alt={nameMap[index]}></img>: {value}</div>
                ))}
            </div>
        </div>
    )
};

export default Result;