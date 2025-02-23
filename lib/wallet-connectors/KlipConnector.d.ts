import { Abi } from "abitype";
import KlipIcon from "../components/wallet-icons/KlipIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
declare class KlipConnector implements WalletForKaiaConnector {
    walletId: string;
    walletName: string;
    walletIcon: KlipIcon;
    private qrModal;
    private request;
    connect(): Promise<`0x${string}` | undefined>;
    getChainId(): number | undefined;
    switchChain(chainId: number): Promise<number>;
    getAddress(): `0x${string}` | undefined;
    writeContract(parameters: {
        chainId: 8217 | 1001;
        address: `0x${string}`;
        abi: Abi;
        functionName: string;
        args: unknown[];
        account: `0x${string}`;
    }): Promise<void>;
}
declare const _default: KlipConnector;
export default _default;
//# sourceMappingURL=KlipConnector.d.ts.map