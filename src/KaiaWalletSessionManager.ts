import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalKaiaWalletConnector from "./UniversalKaiaWalletConnector.js";
import KaiaWalletConnectionModal from "./components/KaiaWalletConnectionModal.js";

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

  public setConnectedWalletInfo(
    walletId: string,
    walletAddress: `0x${string}`,
  ) {
    const currentIsConnected = this.isConnected();

    this.store.setPermanent("connectedWallet", walletId);
    this.store.setPermanent("connectedAddress", walletAddress);

    if (currentIsConnected !== this.isConnected()) {
      this.emit("sessionChanged", this.isConnected());
    }
  }

  public async connect() {
    this.disconnect();
    const result = await new KaiaWalletConnectionModal().waitForLogin();
    this.setConnectedWalletInfo(result.walletId, result.walletAddress);
  }

  public disconnect() {
    UniversalKaiaWalletConnector.disconnect();

    const currentIsConnected = this.isConnected();

    this.store.remove("connectedWallet");
    this.store.remove("connectedAddress");

    if (currentIsConnected !== this.isConnected()) {
      this.emit("sessionChanged", this.isConnected());
    }
  }

  public async writeContract() {
    //TODO:
  }
}

export default new KaiaWalletSessionManager();
