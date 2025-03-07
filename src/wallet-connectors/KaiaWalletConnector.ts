import { BrowserInfo } from "@common-module/app";
import { injected } from "@wagmi/connectors";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";

class KaiaWalletConnector extends WagmiWalletConnector {
  public walletId = "kaia-wallet";
  public walletName = "Kaia Wallet";
  public walletIcon = new KaiaWalletIcon();

  public init() {
    let provider = (window as any).klaytn;
    if (!provider) {
      if (BrowserInfo.isMobileDevice()) {
        provider = (window as any).ethereum;
      } else {
        provider = (window as any).ethereum?.isKaikas
          ? (window as any).ethereum
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
