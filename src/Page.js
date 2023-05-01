/* Empty react component */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import DiePicker from './diepicker';
import Roller from './roller';


const Page = ( { cool } ) => {

    const [diePickers, setDiePickers] = useState(new Map());

    const [showPickers, setShowPickers] = useState(true);

    const playerVals = [[3, 0, "Pezzu"], [2, 0, "AR5-D2"], [2, 0, "Frax Passel"], [1, 0, "Thomps"], [3, 1, "Jaku Adras"]];
    const playerCoolVals = [[1, 0, "Pezzu"], [1, 0, "AR5-D2"], [3, 0, "Frax Passel"], [2, 1, "Thomps"], [2, 0, "Jaku Adras"]];



    const callBack = useCallback((id, skill, proficiency, name, type) => {
        setDiePickers(diePickers.set(id, { id: id, skill: skill, proficiency: proficiency, name: name, type: type }));
    }, [diePickers]);

    const rollCallBack = useCallback(() => {
        setShowPickers(false);
    }, []);

    useEffect(() => {
    }, [showPickers, diePickers]);

    return (
        <div>
            <div>
                <Roller diePickers={diePickers} callBack={rollCallBack} showResult={!showPickers} />
            </div>
            <div className="DiePickerGrid">
                <DiePicker callBack={callBack} show={showPickers} id="1" initName="Bad 1" />
                <DiePicker callBack={callBack} show={showPickers} id="2" initName="Bad 2" />
                <DiePicker callBack={callBack} show={showPickers} id="3" initName="Bad 3" />
                <DiePicker callBack={callBack} show={showPickers} id="4" initName="Bad 4" />
                <DiePicker callBack={callBack} show={showPickers} id="5" initName="Bad 5" />
                <DiePicker callBack={callBack} show={showPickers} id="6" initName="Bad 6" />

                {cool && playerCoolVals.map((val, index) => { return (
                    <DiePicker callBack={callBack} initType="player" show={false} id={index+10} initName={val[2]} initSkill={val[0]} initProf={val[1]} />
                )})}

                {!cool && playerVals.map((val, index) => { return (
                    <DiePicker callBack={callBack} initType="player" show={false} id={index+10} initName={val[2]} initSkill={val[0]} initProf={val[1]} />
                )})}
            </div>
        </div>
    );
}

export default Page;