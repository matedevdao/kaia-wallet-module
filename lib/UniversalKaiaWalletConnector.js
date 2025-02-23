import KaiaWalletConnector from "./wallet-connectors/KaiaWalletConnector.js";
import KlipConnector from "./wallet-connectors/KlipConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WagmiWalletConnector from "./wallet-connectors/WagmiWalletConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
class UniversalKaiaWalletConnector {
    connectors = [
        KaiaWalletConnector,
        KlipConnector,
        MetaMaskConnector,
        WalletConnectConnector,
    ];
    init(walletId) {
        for (const connector of this.connectors) {
            if (connector instanceof WagmiWalletConnector) {
                connector.init();
                if (connector.walletId === walletId) {
                    connector.reconnect();
                }
            }
        }
    }
    disconnect() {
        for (const connector of this.connectors) {
            connector.disconnect();
        }
    }
    getWalletConnector(walletId) {
        for (const connector of this.connectors) {
            if (connector.walletId === walletId) {
                return connector;
            }
        }
        throw new Error("Wallet not found");
    }
    getChainId(walletId) {
        const connector = this.getWalletConnector(walletId);
        return connector.getChainId();
    }
    async switchChain(walletId, chainId) {
        const connector = this.getWalletConnector(walletId);
        return connector.switchChain(chainId);
    }
    getAddress(walletId) {
        const connector = this.getWalletConnector(walletId);
        return connector.getAddress();
    }
    async writeContract(walletId, parameters) {
        const connector = this.getWalletConnector(walletId);
        return connector.writeContract(parameters);
    }
}
export default new UniversalKaiaWalletConnector();
//# sourceMappingURL=UniversalKaiaWalletConnector.js.map