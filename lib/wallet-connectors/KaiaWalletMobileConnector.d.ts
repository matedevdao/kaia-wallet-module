import { Abi } from "abitype";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
declare class KaiaWalletMobileConnector implements WalletForKaiaConnector {
    walletId: string;
    walletName: string;
    walletIcon: KaiaWalletIcon;
    private store;
    private qrModal;
    private request;
    private prepare;
    connect(): Promise<`0x${string}` | undefined>;
    disconnect(): Promise<void>;
    getChainId(): number | undefined;
    switchChain(): Promise<number>;
    getAddress(): `0x${string}` | undefined;
    private processParams;
    writeContract(parameters: {
        chainId: 8217 | 1001;
        address: `0x${string}`;
        abi: Abi;
        functionName: string;
        args: unknown[];
        account: `0x${string}`;
        value?: bigint;
    }): Promise<void>;
    signMessage(_: `0x${string}`, message: string): Promise<string>;
}
declare const _default: KaiaWalletMobileConnector;
export default _default;
//# sourceMappingURL=KaiaWalletMobileConnector.d.ts.map