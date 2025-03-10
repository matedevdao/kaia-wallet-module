import { walletConnect } from "@wagmi/connectors";
import WalletConnectIcon from "../components/wallet-icons/WalletConnectIcon.js";
import KaiaWalletModuleConfig from "../KaiaWalletModuleConfig.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";

class WalletConnectConnector extends WagmiWalletConnector {
  public walletId = "walletconnect";
  public walletName = "WalletConnect";
  public walletIcon = new WalletConnectIcon();

  public init() {
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
