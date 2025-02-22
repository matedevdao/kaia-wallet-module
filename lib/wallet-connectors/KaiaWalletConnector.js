import { injected } from "@wagmi/connectors";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
class KaiaWalletConnector extends WagmiWalletConnector {
    walletName = "Kaia Wallet";
    walletIcon = new KaiaWalletIcon();
    init(config) {
        this.config = config;
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
export default new KaiaWalletConnector();
//# sourceMappingURL=KaiaWalletConnector.js.map