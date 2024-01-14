import React, { useState, useEffect } from 'react';
import './VMProvisioningForm.css';

function VMProvisioningForm({ account }) {
    const [vmConfig, setVmConfig] = useState({
        name: '',
        os: '',
        size: '',
        region: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Extract the username (email) from the account object
    useEffect(() => {
        if (account) {
            setVmConfig(prevState => ({
                ...prevState,
                username: account.username
            }));
        }
    }, [account]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVmConfig({ ...vmConfig, [name]: value });
    };

    const backendUrl = window.__RUNTIME_CONFIG__.API_URL || 'http://backend10:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);


        if (!account || !account.username) {
            setIsError(true);
            setMessage('User is not logged in.');
            return;
        }

        const provisioningData = {
            ...vmConfig,
            username: account.username
        };
        try {
            const response = await fetch(`${backendUrl}/provision-vm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(provisioningData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('VM provisioning data saved successfully.');
            } else {
                setIsError(true);
                setMessage('Server responded with an error.');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Failed to send data to the server.');
        }
    };
    

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="vm-form">
                <div>
                    <label>VM Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={vmConfig.name}
                        onChange={handleInputChange}
                        placeholder="Enter VM Name"
                    />
                </div>
                <div>
                   <label>Operating System:</label>
                   <select name="os" value={vmConfig.os} onChange={handleInputChange}>
                   <option value="">Select OS</option>
                   <option value="Windows 11">Windows 11</option>
                   <option value="Windows 10">Windows 10</option>
                   {/* Add other OS options as needed */}
                 </select>
                </div>

                <div>
                    <label>VM Size:</label>
                    <select name="size" value={vmConfig.size} onChange={handleInputChange}>
                        <option value="">Select Size</option>
                        <option value="Standard_D4s_v3">Standard_D4s_v3</option>
                        <option value="Standard_DS2_v2">Standard_DS2_v2</option>
                        <option value="Standard_DS3_v2">Standard_DS3_v2</option>
                        {/* Add other size options */}
                    </select>
                </div>
                <div>
                    <label>Region:</label>
                    <select name="region" value={vmConfig.region} onChange={handleInputChange}>
                        <option value="">Select Region</option>
                        <option value="westeurope">West Europe</option>
                        <option value="northeurope">North Europe</option>
                        {/* Add other region options */}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && (
                <div className={isError ? 'error-message' : 'success-message'}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default VMProvisioningForm;
