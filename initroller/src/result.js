// functional component called result

import React from 'react';
import { useEffect } from 'react';

const Result = ({ result }) => {

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <div>  
            <p>{result.name}</p>
            <p>{result.skill.join(",")}</p>
            <p>{result.proficiency.join(",")}</p>
        </div>
    )
};

export default Result;