import { DomNode } from "@common-module/app";
import { Config, CreateConnectorFn } from "@wagmi/core";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
export default abstract class WagmiWalletConnector implements WalletForKaiaConnector {
    abstract walletName: string;
    abstract walletIcon: DomNode;
    private _config?;
    protected get config(): Config;
    protected set config(config: Config);
    private _wagmiConnector?;
    get wagmiConnector(): CreateConnectorFn;
    set wagmiConnector(connector: CreateConnectorFn);
    abstract init(config: Config): void;
    connect(): Promise<string | undefined>;
}
//# sourceMappingURL=WagmiWalletConnector.d.ts.map