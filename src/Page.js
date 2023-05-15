/* Empty react component */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import DiePicker from './diepicker';
import Roller from './roller';

import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

import { b2cPolicies, protectedResources } from './authConfig';
import { compareIssuingPolicy } from './utils/claimUtils';




const Page = ({ cool, useStorage = false }) => {

    const [searchParams] = useSearchParams();

    const [diePickers, setDiePickers] = useState(new Map());

    const [showPickers, setShowPickers] = useState(true);

    const [showPlayers, setShowPlayers] = useState(false);

    const playerVals = [[3, 0, "Pezzu"], [2, 0, "AR5-D2"], [2, 0, "Frax Passel"], [1, 0, "Thomps"], [3, 1, "Jaku Adras"]];
    const playerCoolVals = [[1, 0, "Pezzu"], [1, 0, "AR5-D2"], [3, 0, "Frax Passel"], [2, 1, "Thomps"], [2, 0, "Jaku Adras"]];

    const { instance } = useMsal();
    useEffect(() => {
        console.log("instance", instance);
        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload.account
            ) {
                /**
                 * For the purpose of setting an active account for UI update, we want to consider only the auth
                 * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
                 * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
                 * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                 */
                if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.editProfile)) {
                    // retrieve the account from initial sing-in to the app
                    const originalSignInAccount = instance
                        .getAllAccounts()
                        .find(
                            (account) =>
                                account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
                                account.idTokenClaims.sub === event.payload.idTokenClaims.sub &&
                                compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn)
                        );

                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        account: originalSignInAccount,
                    };

                    // silently login again with the signUpSignIn policy
                    instance.ssoSilent(signUpSignInFlowRequest);
                }

                /**
                 * Below we are checking if the user is returning from the reset password flow.
                 * If so, we will ask the user to reauthenticate with their new password.
                 * If you do not want this behavior and prefer your users to stay signed in instead,
                 * you can replace the code below with the same pattern used for handling the return from
                 * profile edit flow
                 */
                if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        scopes: [
                            ...protectedResources.apiTodoList.scopes.read,
                            ...protectedResources.apiTodoList.scopes.write,
                        ],
                    };
                    instance.loginRedirect(signUpSignInFlowRequest);
                }
            }

            if (event.eventType === EventType.LOGIN_FAILURE) {
                // Check for forgot password error
                // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
                if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
                    const resetPasswordRequest = {
                        authority: b2cPolicies.authorities.forgotPassword.authority,
                        scopes: [],
                    };
                    instance.loginRedirect(resetPasswordRequest);
                }
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
        // eslint-disable-next-line
    }, [instance]);


    const callBack = useCallback((id, ability, proficiency, boost, name, type) => {
        setDiePickers(diePickers.set(id, { id: id, ability: ability, proficiency: proficiency, boost: boost, name: name, type: type }));
    }, [diePickers]);

    const rollCallBack = useCallback(() => {
        setShowPickers(false);
    }, []);

    useEffect(() => {
        setShowPlayers(searchParams.get("showPlayers"));
    }, [showPickers, diePickers, searchParams]);

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