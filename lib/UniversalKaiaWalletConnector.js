import KaiaWalletConnector from "./wallet-connectors/KaiaWalletConnector.js";
import KlipConnector from "./wallet-connectors/KlipConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
class UniversalKaiaWalletConnector {
    connectors = [
        KaiaWalletConnector,
        KlipConnector,
        MetaMaskConnector,
        WalletConnectConnector,
    ];
    init(walletId) {
    }
    disconnect() {
    }
}
export default new UniversalKaiaWalletConnector();
//# sourceMappingURL=UniversalKaiaWalletConnector.js.map