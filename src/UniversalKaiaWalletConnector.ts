import WalletForKaiaConnector from "./wallet-connectors/WalletForKaiaConnector.js";

class UniversalKaiaWalletConnector {
  private connectors: WalletForKaiaConnector[] = [];

  public init(walletId?: string) {
  }

  public disconnect() {
  }
}

export default new UniversalKaiaWalletConnector();
