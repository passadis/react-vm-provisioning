import React, { useState, useEffect } from 'react';
import { useMsal, useAccount } from "@azure/msal-react";
import VMProvisioningForm from './VMProvisioningForm';
import logo from './logo.png';
import './App.css';

function App() {
    const { instance: msalInstance, inProgress, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [isAuthenticated, setIsAuthenticated] = useState(!!account);

    useEffect(() => {
        setIsAuthenticated(!!account);
        if (account) {
            console.log('Account:', account);
            console.log('Authenticated:', isAuthenticated);
            // Redirect to VMProvisioningForm if authenticated
            if (isAuthenticated) {
                // Logic to display VMProvisioningForm directly
                // This can be a redirect or a state change to display the component
            }
        }
    }, [account, isAuthenticated]);

    const handleLogin = () => {
        msalInstance.loginRedirect();
    };

    const handleLogout = () => {
        msalInstance.logoutRedirect();
    };

    useEffect(() => {
        console.log('MSAL In Progress:', inProgress);
    }, [inProgress]);

    switch (inProgress) {
        case "login":
            return <div>Loading...</div>;
        case "acquireToken":
            return <div>Acquiring token...</div>;
        case "none":
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>VM Provisioning Application</h1>
                        {!isAuthenticated ? (
                            <button className="button" onClick={handleLogin}>Login</button>
                        ) : (
                            <>
                            <div>Welcome, {account ? account.username : ''}</div>
                            <button className="button" onClick={handleLogout}>Logout</button>
                           </>                       
                        )}
                    </header>
                    {isAuthenticated ? <VMProvisioningForm account={account} /> : <div>Please log in to continue.</div>}
                </div>
            );
        case "error":
            return <div>An error occurred. Please try again.</div>;
        default:
            return <div>Unknown state.</div>;
    }
}

export default App;
