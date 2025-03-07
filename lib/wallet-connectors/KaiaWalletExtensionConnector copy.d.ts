import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
declare class KaiaWalletExtensionConnector extends WagmiWalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: KaiaWalletIcon;
    init(): void;
}
declare const _default: KaiaWalletExtensionConnector;
export default _default;
//# sourceMappingURL=KaiaWalletExtensionConnector%20copy.d.ts.map