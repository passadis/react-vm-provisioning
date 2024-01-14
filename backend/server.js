const express = require('express');
const fetch = require('node-fetch');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const sql = require('mssql');

const osMapping = {
    "Windows 11": {
        imageOffer: "windows-11",
        imageSku: "win11-22h2-pro"
    },
    "Windows 10": {
        imageOffer: "windows-10",
        imageSku: "win10-22h2-pro-g2"
    },
    // Add other OS mappings here
};

function processVmConfig(requestBody) {
    const osDetails = osMapping[requestBody.os];
    if (!osDetails) {
        throw new Error('Unsupported OS selected');
    }
    return {
        vmName: requestBody.name,
        imageOffer: osDetails.imageOffer,
        imageSku: osDetails.imageSku,
        vmSize: requestBody.size,
        region: requestBody.region,
        username: requestBody.username // Include the username in the processed config
    };
}

const app = express();
const port = 3001;
app.use(express.json());

// Azure Key Vault details
const credential = new DefaultAzureCredential();
const vaultName = process.env["KEY_VAULT_NAME"];
const url = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(url, credential);

// Function to get secret from Azure Key Vault
async function getSecret(secretName) {
    const secret = await client.getSecret(secretName);
    return secret.value;
}

// Function to connect to Azure SQL Database
async function getSqlConfig() {
    const username = await getSecret("sql-admin");
    const password = await getSecret("sql-pass");
    const server = await getSecret("sql-server");
    const database = await getSecret("sql-db");

    return {
        user: username,
        password: password,
        server: server,
        database: database,
        options: {
            encrypt: true,
            trustServerCertificate: false
        }
    };
}

app.post('/provision-vm', async (req, res) => {
    try {
        const vmConfig = processVmConfig(req.body);

        // Connect to the SQL database
        let pool = await sql.connect(await getSqlConfig());
        
        // Perform the SQL INSERT operation
        let result = await pool.request()
            .input('username', sql.NVarChar, vmConfig.username) // Add username input
            .input('vmName', sql.NVarChar, vmConfig.vmName)
            .input('imageOffer', sql.NVarChar, vmConfig.imageOffer)
            .input('imageSku', sql.NVarChar, vmConfig.imageSku)
            .input('vmSize', sql.NVarChar, vmConfig.vmSize)
            .input('region', sql.NVarChar, vmConfig.region)
            .query(`
                INSERT INTO vmprovs 
                (Username, VmName, ImageOffer, ImageSku, VmSize, Location) 
                VALUES 
                (@username, @vmName, @imageOffer, @imageSku, @vmSize, @region)
            `);

        res.status(201).send({ message: 'VM provisioning data saved successfully' });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send({ message: 'Error saving VM provisioning data', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
