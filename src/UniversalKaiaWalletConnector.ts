import WalletForKaiaConnector from "./wallet-connectors/WalletForKaiaConnector.js";

class UniversalKaiaWalletConnector {
  private connectors: WalletForKaiaConnector[] = [];

  public init(walletId?: string) {
  }
}

export default new UniversalKaiaWalletConnector();
