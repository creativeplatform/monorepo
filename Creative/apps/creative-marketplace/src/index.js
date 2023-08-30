import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './App.scss'
import ScrollToTop from "./ScrollToTop";
import { ThirdwebProvider, smartWallet, metamaskWallet, coinbaseWallet, localWallet, walletConnect, paperWallet } from "@thirdweb-dev/react";
import { ACCOUNT_FACTORY_TESTNET } from "./const/config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.Fragment>
        <ThirdwebProvider 
        activeChain="mumbai" 
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} 
        supportedWallets={[
            smartWallet({
                factoryAddress: ACCOUNT_FACTORY_TESTNET,
                gasless: false,
                personalWallets: [
                    paperWallet({
                        paperClientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID
                    }),
                  metamaskWallet(),
                  coinbaseWallet(),
                  walletConnect({
                    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT
                  }),
                  localWallet({ persist: true })
                ]
            })
        ]}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </ThirdwebProvider>
    </React.Fragment>
);

