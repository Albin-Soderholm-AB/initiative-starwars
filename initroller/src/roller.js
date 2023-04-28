// react functional component called Roller

import React from 'react';
import { useState } from 'react';




const Roller = () => {
    const [roll, setRoll] = useState(0);

    

    const rollDice = () => {
        setRoll(Math.floor(Math.random() * 6) + 1);
    }

    return (
        <div>
            <h1>Roller</h1>
            <p>{roll}</p>
            <button onClick={rollDice}>Roll</button>
        </div>
    );
}

// export default Roller;
export default Roller;