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
    }
}
export default new UniversalKaiaWalletConnector();
//# sourceMappingURL=UniversalKaiaWalletConnector.js.map