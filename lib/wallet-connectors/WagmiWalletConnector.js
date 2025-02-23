import { connect, reconnect } from "@wagmi/core";
import KaiaRpcConnector from "../KaiaRpcConnector.js";
export default class WagmiWalletConnector {
    _wagmiConnector;
    get wagmiConnector() {
        if (!this._wagmiConnector)
            throw new Error("Connector not initialized");
        return this._wagmiConnector;
    }
    set wagmiConnector(connector) {
        this._wagmiConnector = connector;
    }
    async connect() {
        const result = await connect(KaiaRpcConnector.getWagmiConfig(), {
            connector: this.wagmiConnector,
        });
        return result.accounts[0];
    }
    async reconnect() {
        reconnect(KaiaRpcConnector.getWagmiConfig(), {
            connectors: [this.wagmiConnector],
        });
    }
}
//# sourceMappingURL=WagmiWalletConnector.js.map