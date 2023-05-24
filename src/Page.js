/* Empty react component */
import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import DiePicker from './diepicker';
import Roller from './roller';

import { useNavigate } from "react-router-dom";

import SockJsClient from 'react-stomp';

import useWebSocket from 'react-use-websocket';
import useToken from './hooks/useToken';
import usePubSub from './hooks/usePubSub';



const Page = ({ cool, useStorage = false }) => {

    // @ts-ignore
    const webSocket = useRef(null);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [diePickers, setDiePickers] = useState(new Map());

    const [showPickers, setShowPickers] = useState(true);

    const [showPlayers, setShowPlayers] = useState(false);

    const token = useToken();

    const message = usePubSub();

    

    const playerVals = [[3, 0, "Pezzu"], [2, 0, "AR5-D2"], [2, 0, "Frax Passel"], [1, 0, "Thomps"], [3, 1, "Jaku Adras"]];
    const playerCoolVals = [[1, 0, "Pezzu"], [1, 0, "AR5-D2"], [3, 0, "Frax Passel"], [2, 1, "Thomps"], [2, 0, "Jaku Adras"]];


    const callBack = useCallback((id, ability, proficiency, boost, name, type) => {
        setDiePickers(diePickers.set(id, { id: id, ability: ability, proficiency: proficiency, boost: boost, name: name, type: type }));
    }, [diePickers]);

    const rollCallBack = useCallback(() => {
        setShowPickers(false);
    }, []);

    useEffect(() => {
        setShowPlayers(searchParams.get("showPlayers"));
    }, [showPickers, diePickers, searchParams]);

    useEffect(() => {
        console.log("Message received: " + message);
    }, [message]);

    

    


    return (
        <div>
            <div className="DiePicker">
                <Roller diePickers={diePickers} callBack={rollCallBack} showResultInit={!showPickers} useStorage={useStorage} />
            </div>
            <div className="DiePickerGrid">
                <DiePicker callBack={callBack} show={showPickers && !useStorage} id="1" initName="Bad 1" />
                <DiePicker callBack={callBack} show={showPickers && !useStorage} id="2" initName="Bad 2" />
                <DiePicker callBack={callBack} show={showPickers && !useStorage} id="3" initName="Bad 3" />
                <DiePicker callBack={callBack} show={showPickers && !useStorage} id="4" initName="Bad 4" />
                <DiePicker callBack={callBack} show={showPickers && !useStorage} id="5" initName="Bad 5" />
                <DiePicker callBack={callBack} show={showPickers && !useStorage} id="6" initName="Bad 6" />

                {cool && playerCoolVals.map((val, index) => {
                    return (
                        <DiePicker callBack={callBack} initType="player" show={showPlayers && showPickers} id={index + 10} key={index + 10} initName={val[2]} initAbility={val[0]} initProf={val[1]} />
                    )
                })}

                {!cool && playerVals.map((val, index) => {
                    return (
                        <DiePicker callBack={callBack} initType="player" show={showPlayers && showPickers} id={index + 10} key={index + 10} initName={val[2]} initAbility={val[0]} initProf={val[1]} />
                    )
                })}
            </div>
        </div>
    );
}

export default Page;