import { Abi } from "viem";
import WalletForKaiaConnector from "./wallet-connectors/WalletForKaiaConnector.js";
declare class UniversalKaiaWalletConnector {
    connectors: WalletForKaiaConnector[];
    init(walletId?: string): void;
    disconnect(): void;
    private getWalletConnector;
    getChainId(walletId: string): number | undefined;
    switchChain(walletId: string, chainId: number): Promise<number>;
    getAddress(walletId: string): `0x${string}` | undefined;
    writeContract(walletId: string, parameters: {
        chainId: 8217 | 1001;
        address: `0x${string}`;
        abi: Abi;
        functionName: string;
        args: unknown[];
        account: `0x${string}`;
        value?: bigint;
    }): Promise<void>;
}
declare const _default: UniversalKaiaWalletConnector;
export default _default;
//# sourceMappingURL=UniversalKaiaWalletConnector.d.ts.map