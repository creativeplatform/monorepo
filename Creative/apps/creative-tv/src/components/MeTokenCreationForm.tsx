import { useAddress } from '@thirdweb-dev/react';
import React, { useState } from 'react'
import { createMeToken } from 'utils/fetchers/createMeToken';

export default function MeTokenCreationForm() {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [hubId, setHubId] = useState(0);
    const [assetsDeposited, setAssetsDeposited] = useState("");
    const address = useAddress();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log({ name, symbol, hubId, assetsDeposited });
        const data = await createMeToken({name, symbol, hubId, assetsDeposited}, address!);
        // do something with the form data
    };

    return (
      <>

        <form onSubmit={handleSubmit} style={{ border: '2px solid black', height: '400px', display: 'flex', flexDirection: 'column', padding: '1em', backgroundColor: 'lightgray' }}>
        <h1 style={{ marginBottom: '1em', fontSize: 'xl' }}>MeToken Creation Form</h1>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Symbol:
                <input
                    type="text"
                    value={symbol}
                    onChange={e => setSymbol(e.target.value)}
                />
            </label>
            <label>
                Hub ID:
                <input
                    type="number"
                    value={hubId}
                    onChange={e => setHubId(parseInt(e.target.value, 10))}
                />
            </label>
            <label>
                Assets Deposited:
                <input
                    type="text"
                    value={assetsDeposited}
                    onChange={e => setAssetsDeposited(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </>
        
    );
}
