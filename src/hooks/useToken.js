import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';


const useToken = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = (instance) => {
            // Retrieve an access token
            if (inProgress === 'none' && accounts.length > 0) {
                console.log("Accounts: ", accounts);
                const request = {
                    account: accounts[0],
                    scopes: ["User.Read"]
                };
                let token = instance.acquireTokenSilent(request)
                    .then(response => {
                        console.log('response', response);
                        if (response.idToken) {
                            console.log('idToken', response.idToken);
                            return response.idToken;
                        }
                        return "";
                    })
                    .catch(error => console.log('token error', error));
                console.log("Retrieved token: ", token);
                return token;
            }
            return Promise.resolve("");
        };
        getToken(instance).then((token) => {
            setToken(token);
        }).catch(error => console.log(error));
    }, [instance, accounts, inProgress]);

    return token;
}

export default useToken;
