import { injected } from "@wagmi/connectors";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
class KaiaWalletConnector extends WagmiWalletConnector {
    walletId = "kaia-wallet";
    walletName = "Kaia Wallet";
    walletIcon = new KaiaWalletIcon();
    init() {
        this.wagmiConnector = injected({
            target() {
                return {
                    id: "kaia-wallet",
                    name: "Kaia Wallet",
                    provider: window.klaytn ?? (window.ethereum?.isKaikas
                        ? window.ethereum
                        : undefined),
                };
            },
        });
    }
}
export default new KaiaWalletConnector();
//# sourceMappingURL=KaiaWalletConnector.js.map