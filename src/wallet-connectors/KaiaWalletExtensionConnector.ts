import { injected } from "@wagmi/connectors";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";

class KaiaWalletExtensionConnector extends WagmiWalletConnector {
  public walletId = "kaia-wallet";
  public walletName = "Kaia Wallet";
  public walletIcon = new KaiaWalletIcon();

  public init() {
    this.wagmiConnector = injected({
      target() {
        return {
          id: "kaia-wallet",
          name: "Kaia Wallet",
          provider: (window as any).klaytn,
        };
      },
    });
  }
}

export default new KaiaWalletExtensionConnector();
