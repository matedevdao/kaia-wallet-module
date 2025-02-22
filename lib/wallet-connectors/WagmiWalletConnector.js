import { connect } from "@wagmi/core";
export default class WagmiWalletConnector {
    _config;
    get config() {
        if (!this._config)
            throw new Error("Config not initialized");
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
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
        const result = await connect(this.config, {
            connector: this.wagmiConnector,
        });
        return result.accounts[0];
    }
}
//# sourceMappingURL=WagmiWalletConnector.js.map