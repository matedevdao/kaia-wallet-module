import { BrowserInfo } from "@common-module/app";
import { injected } from "@wagmi/connectors";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
class KaiaWalletConnector extends WagmiWalletConnector {
    walletId = "kaia-wallet";
    walletName = "Kaia Wallet";
    walletIcon = new KaiaWalletIcon();
    init() {
        let provider = window.klaytn;
        if (!provider) {
            if (BrowserInfo.isMobileDevice()) {
                provider = window.ethereum;
            }
            else {
                provider = window.ethereum?.isKaikas
                    ? window.ethereum
                    : undefined;
            }
        }
        this.wagmiConnector = injected({
            target() {
                return { id: "kaia-wallet", name: "Kaia Wallet", provider };
            },
        });
    }
}
export default new KaiaWalletConnector();
//# sourceMappingURL=KaiaWalletConnector.js.map