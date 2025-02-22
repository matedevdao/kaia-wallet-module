import WalletForKaiaConnector from "./wallet-connectors/WalletForKaiaConnector.js";
declare class UniversalKaiaWalletConnector {
    connectors: WalletForKaiaConnector[];
    init(walletId?: string): void;
    disconnect(): void;
}
declare const _default: UniversalKaiaWalletConnector;
export default _default;
//# sourceMappingURL=UniversalKaiaWalletConnector.d.ts.map