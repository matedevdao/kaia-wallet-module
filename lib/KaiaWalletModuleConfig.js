import { I18nMessageManager } from "@common-module/app";
import messages_en from "../locales/en.yml";
import messages_ko from "../locales/ko.yml";
import KaiaWalletSessionManager from "./KaiaWalletSessionManager.js";
I18nMessageManager.addMessagesBulk({
    en: messages_en,
    ko: messages_ko,
});
class KaiaWalletModuleConfig {
    appName = "";
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
        this.appName = options.appName;
        this.walletConnectProjectId = options.walletConnectProjectId;
        KaiaWalletSessionManager.init();
    }
}
export default new KaiaWalletModuleConfig();
//# sourceMappingURL=KaiaWalletModuleConfig.js.map