import KaiaWalletConnector from "./wallet-connectors/KaiaWalletConnector.js";
import KlipConnector from "./wallet-connectors/KlipConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
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
  }

  public disconnect() {
  }
}

export default new UniversalKaiaWalletConnector();
