import WalletConnectIcon from "../components/wallet-icons/WalletConnectIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
declare class WalletConnectConnector extends WagmiWalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: WalletConnectIcon;
    init(): void;
}
declare const _default: WalletConnectConnector;
export default _default;
//# sourceMappingURL=WalletConnectConnector.d.ts.map