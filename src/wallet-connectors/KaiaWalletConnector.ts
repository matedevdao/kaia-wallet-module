import { injected } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";

class KaiaWalletConnector extends WagmiWalletConnector {
  public walletName = "Kaia Wallet";
  public walletIcon = new KaiaWalletIcon();

  public init(config: Config) {
    this.config = config;
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

export default new KaiaWalletConnector();
