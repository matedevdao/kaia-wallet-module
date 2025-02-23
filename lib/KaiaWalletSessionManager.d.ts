import { EventContainer } from "@common-module/ts";
import { Abi } from "viem";
declare class KaiaWalletSessionManager extends EventContainer<{
    sessionChanged: (connected: boolean) => void;
}> {
    private store;
    getConnectedWallet(): string | undefined;
    getConnectedAddress(): `0x${string}` | undefined;
    isConnected(): boolean;
    init(): void;
    setConnectedWalletInfo(walletId: string, walletAddress: `0x${string}`): void;
    connect(): Promise<void>;
    disconnect(): void;
    writeContract(parameters: {
        chainId: 8217 | 1001;
        address: `0x${string}`;
        abi: Abi;
        functionName: string;
        args: unknown[];
    }): Promise<void>;
    private showConnectWalletDialog;
    private showWalletMismatchDialog;
    private showSwitchNetworkDialog;
}
declare const _default: KaiaWalletSessionManager;
export default _default;
//# sourceMappingURL=KaiaWalletSessionManager.d.ts.map