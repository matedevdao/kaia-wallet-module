import KaiaWalletSessionManager from "./KaiaWalletSessionManager.js";
class KaiaWalletModuleConfig {
    _walletConnectProjectId;
    get walletConnectProjectId() {
        if (!this._walletConnectProjectId) {
            throw new Error("WalletConnect project ID not set");
        }
        return this._walletConnectProjectId;
    }
    set walletConnectProjectId(projectId) {
        this._walletConnectProjectId = projectId;
    }
    init(options) {
        this.walletConnectProjectId = options.walletConnectProjectId;
        KaiaWalletSessionManager.init();
    }
}
export default new KaiaWalletModuleConfig();
//# sourceMappingURL=KaiaWalletModuleConfig.js.map