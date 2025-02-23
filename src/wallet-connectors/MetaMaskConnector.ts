import { metaMask } from "@wagmi/connectors";
import { Config, connect, ConnectReturnType } from "@wagmi/core";
import MetaMaskIcon from "../components/wallet-icons/MetaMaskIcon.js";
import KaiaRpcConnector from "../KaiaRpcConnector.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";

class MetaMaskConnector extends WagmiWalletConnector {
  public walletId = "metamask";
  public walletName = "MetaMask";
  public walletIcon = new MetaMaskIcon();

  public init() {
    this.wagmiConnector = metaMask();
  }

  public async connect(): Promise<`0x${string}` | undefined> {
    const result = await new Promise<ConnectReturnType<Config>>(
      (resolve, reject) => {
        let found = false;

        const findingModelInterval = setInterval(() => {
          const model = document.querySelector(".install-model");
          if (model) {
            if (!found) found = true;
          } else {
            if (found) {
              clearInterval(findingModelInterval);
              reject(new Error("User rejected request"));
            }
          }
        }, 1000);

        connect(KaiaRpcConnector.getWagmiConfig(), {
          connector: this.wagmiConnector,
        }).then((result) => resolve(result as any))
          .catch((error) => reject(error))
          .finally(() => clearInterval(findingModelInterval));
      },
    );
    return result.accounts[0];
  }
}

export default new MetaMaskConnector();
