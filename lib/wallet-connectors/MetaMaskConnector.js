import { metaMask } from "@wagmi/connectors";
import { connect } from "@wagmi/core";
import MetaMaskIcon from "../components/wallet-icons/MetaMaskIcon.js";
import KaiaRpcConnector from "../KaiaRpcConnector.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
class MetaMaskConnector extends WagmiWalletConnector {
    walletId = "metamask";
    walletName = "MetaMask";
    walletIcon = new MetaMaskIcon();
    init() {
        this.wagmiConnector = metaMask();
    }
    async connect() {
        const result = await new Promise((resolve, reject) => {
            let found = false;
            const findingModelInterval = setInterval(() => {
                const model = document.querySelector(".install-model");
                if (model) {
                    if (!found)
                        found = true;
                }
                else {
                    if (found) {
                        clearInterval(findingModelInterval);
                        reject(new Error("User rejected request"));
                    }
                }
            }, 1000);
            connect(KaiaRpcConnector.getWagmiConfig(), {
                connector: this.wagmiConnector,
            }).then((result) => resolve(result))
                .catch((error) => reject(error))
                .finally(() => clearInterval(findingModelInterval));
        });
        return result.accounts[0];
    }
}
export default new MetaMaskConnector();
//# sourceMappingURL=MetaMaskConnector.js.map