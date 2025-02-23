import KaiaWalletConnector from "./wallet-connectors/KaiaWalletConnector.js";
import KlipConnector from "./wallet-connectors/KlipConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WagmiWalletConnector from "./wallet-connectors/WagmiWalletConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
import WalletForKaiaConnector from "./wallet-connectors/WalletForKaiaConnector.js";

class UniversalKaiaWalletConnector {
  public connectors: WalletForKaiaConnector[] = [
    KaiaWalletConnector,
    KlipConnector,
    MetaMaskConnector,
    WalletConnectConnector,
  ];

  public init(walletId?: string) {
    for (const connector of this.connectors) {
      if (connector instanceof WagmiWalletConnector) {
        connector.init();
        if (connector.walletId === walletId) {
          connector.reconnect();
        }
      }
    }
  }

  public disconnect() {
  }
}

export default new UniversalKaiaWalletConnector();
