import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalKaiaWalletConnector from "./UniversalKaiaWalletConnector.js";
import KaiaWalletConnectionModal from "./components/KaiaWalletConnectionModal.js";
class KaiaWalletSessionManager extends EventContainer {
    store = new Store("kaia-wallet-session-manager");
    getConnectedWallet() {
        return this.store.get("connectedWallet");
    }
    getConnectedAddress() {
        return this.store.get("connectedAddress");
    }
    isConnected() {
        return !!this.getConnectedWallet() && !!this.getConnectedAddress();
    }
    init() {
        UniversalKaiaWalletConnector.init(this.getConnectedWallet());
    }
    setConnectedWalletInfo(walletId, walletAddress) {
        const currentIsConnected = this.isConnected();
        this.store.setPermanent("connectedWallet", walletId);
        this.store.setPermanent("connectedAddress", walletAddress);
        if (currentIsConnected !== this.isConnected()) {
            this.emit("sessionChanged", this.isConnected());
        }
    }
    async connect() {
        this.disconnect();
        const result = await new KaiaWalletConnectionModal().waitForLogin();
        this.setConnectedWalletInfo(result.walletId, result.walletAddress);
    }
    disconnect() {
        UniversalKaiaWalletConnector.disconnect();
        const currentIsConnected = this.isConnected();
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        if (currentIsConnected !== this.isConnected()) {
            this.emit("sessionChanged", this.isConnected());
        }
    }
    async writeContract() {
    }
}
export default new KaiaWalletSessionManager();
//# sourceMappingURL=KaiaWalletSessionManager.js.map