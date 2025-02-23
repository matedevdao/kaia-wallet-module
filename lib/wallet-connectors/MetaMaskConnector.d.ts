import { Config } from "@wagmi/core";
import MetaMaskIcon from "../components/wallet-icons/MetaMaskIcon.js";
import WagmiWalletConnector from "./WagmiWalletConnector.js";
declare class MetaMaskConnector extends WagmiWalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: MetaMaskIcon;
    init(config: Config): void;
    connect(): Promise<`0x${string}` | undefined>;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map