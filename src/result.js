// functional component called result

import React from 'react';
import { useEffect, useState } from 'react';

import blank from './assets/images/blank.png';
import success from './assets/images/success.png';
import advantage from './assets/images/advantage.png';
import triumph from './assets/images/triumph.png';


const Result = ({ result }) => {

    const nameMap = {
        3: blank,
        1: success,
        2: advantage,
        0: triumph
    };

    useEffect(() => {
    }, [result]);

    const [show, setShow] = useState(false);

    const showDetails = () => {
        setShow(!show);
    };


    return (
        <div>
        <div className='multiDiceDisplay' onClick={() => showDetails()}>  
            <p className={result.type}>{result.name}</p>
            <div className='dieLine'>
                {result.rolls.map((value, index) => (

                    // img tag that displays the advantage image
                    <div className='displayDice'><img src={nameMap[index]} alt={nameMap[index]}></img>: {value}</div>
                    
                ))}
            
            </div>
            
        </div>
        {show && 
        <div className='multiDiceDisplay'>
            <p className={result.type}></p>
            <div className='dieLine'>
                <div className='displayDice'>Skill: {result.skillDice}</div>
                <div className='displayDice'>Proficiency: {result.profDice}</div>
                {result.boostDice > 0 && <div className='displayDice'>Boost: {result.boostDice}</div>}
            </div>
            </div>}
        </div>
    )
};

export default Result;