import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalKaiaWalletConnector from "./UniversalKaiaWalletConnector.js";

class KaiaWalletSessionManager extends EventContainer<{
  sessionChanged: (connected: boolean) => void;
}> {
  private store = new Store("kaia-wallet-session-manager");

  public getConnectedWallet() {
    return this.store.get<string>("connectedWallet");
  }
  public getConnectedAddress() {
    return this.store.get<`0x${string}`>("connectedAddress");
  }
  public isConnected() {
    return !!this.getConnectedWallet() && !!this.getConnectedAddress();
  }

  public init() {
    UniversalKaiaWalletConnector.init(this.getConnectedWallet());
  }

  public async writeContract() {}
}

export default new KaiaWalletSessionManager();
