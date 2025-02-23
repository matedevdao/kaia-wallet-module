import { Abi } from "abitype";
import KlipIcon from "../components/wallet-icons/KlipIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
declare class KlipConnector implements WalletForKaiaConnector {
    walletId: string;
    walletName: string;
    walletIcon: KlipIcon;
    private store;
    private qrModal;
    private request;
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
declare const _default: KlipConnector;
export default _default;
//# sourceMappingURL=KlipConnector.d.ts.map