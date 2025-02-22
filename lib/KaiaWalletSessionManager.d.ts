import { EventContainer } from "@common-module/ts";
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
    writeContract(): Promise<void>;
}
declare const _default: KaiaWalletSessionManager;
export default _default;
//# sourceMappingURL=KaiaWalletSessionManager.d.ts.map