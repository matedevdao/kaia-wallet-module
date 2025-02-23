import { Config } from "@wagmi/core";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
declare class KaiaWalletConnector extends WagmiWalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: KaiaWalletIcon;
    init(config: Config): void;
}
declare const _default: KaiaWalletConnector;
export default _default;
//# sourceMappingURL=KaiaWalletConnector.d.ts.map