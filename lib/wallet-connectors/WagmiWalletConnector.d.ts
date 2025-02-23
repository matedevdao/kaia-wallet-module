import { DomNode } from "@common-module/app";
import { CreateConnectorFn } from "@wagmi/core";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
export default abstract class WagmiWalletConnector implements WalletForKaiaConnector {
    abstract walletId: string;
    abstract walletName: string;
    abstract walletIcon: DomNode;
    private _wagmiConnector?;
    get wagmiConnector(): CreateConnectorFn;
    set wagmiConnector(connector: CreateConnectorFn);
    abstract init(): void;
    connect(): Promise<`0x${string}` | undefined>;
    reconnect(): Promise<void>;
}
//# sourceMappingURL=WagmiWalletConnector.d.ts.map