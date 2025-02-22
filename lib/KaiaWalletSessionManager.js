import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalKaiaWalletConnector from "./UniversalKaiaWalletConnector.js";
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
    async readContract(options) {
        throw new Error("Not implemented");
    }
    async writeContract() { }
}
export default new KaiaWalletSessionManager();
//# sourceMappingURL=KaiaWalletSessionManager.js.map