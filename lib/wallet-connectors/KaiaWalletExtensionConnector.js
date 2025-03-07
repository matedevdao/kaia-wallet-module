import { injected } from "@wagmi/connectors";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
class KaiaWalletExtensionConnector extends WagmiWalletConnector {
    walletId = "kaia-wallet";
    walletName = "Kaia Wallet";
    walletIcon = new KaiaWalletIcon();
    init() {
        this.wagmiConnector = injected({
            target() {
                return {
                    id: "kaia-wallet",
                    name: "Kaia Wallet",
                    provider: window.klaytn,
                };
            },
        });
    }
}
export default new KaiaWalletExtensionConnector();
//# sourceMappingURL=KaiaWalletExtensionConnector.js.map