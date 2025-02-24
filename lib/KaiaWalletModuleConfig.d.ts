export interface IKaiaWalletModuleConfig {
    appName: string;
    walletConnectProjectId: string;
}
declare class KaiaWalletModuleConfig implements IKaiaWalletModuleConfig {
    appName: string;
    private _walletConnectProjectId?;
    get walletConnectProjectId(): string;
    set walletConnectProjectId(projectId: string);
    init(options: IKaiaWalletModuleConfig): void;
}
declare const _default: KaiaWalletModuleConfig;
export default _default;
//# sourceMappingURL=KaiaWalletModuleConfig.d.ts.map