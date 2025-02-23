import { walletConnect } from "@wagmi/connectors";
import WalletConnectIcon from "../components/wallet-icons/WalletConnectIcon.js";
import KaiaWalletModuleConfig from "../KaiaWalletModuleConfig.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
class WalletConnectConnector extends WagmiWalletConnector {
    walletId = "walletconnect";
    walletName = "WalletConnect";
    walletIcon = new WalletConnectIcon();
    init(config) {
        this.config = config;
        this.wagmiConnector = walletConnect({
            projectId: KaiaWalletModuleConfig.walletConnectProjectId,
            qrModalOptions: {
                themeVariables: {
                    "--wcm-z-index": "99998",
                },
            },
        });
    }
}
export default new WalletConnectConnector();
//# sourceMappingURL=WalletConnectConnector.js.map