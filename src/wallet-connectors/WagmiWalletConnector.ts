import { DomNode } from "@common-module/app";
import { connect, CreateConnectorFn, reconnect } from "@wagmi/core";
import KaiaRpcConnector from "../KaiaRpcConnector.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";

export default abstract class WagmiWalletConnector
  implements WalletForKaiaConnector {
  abstract walletId: string;
  abstract walletName: string;
  abstract walletIcon: DomNode;

  private _wagmiConnector?: CreateConnectorFn;
  public get wagmiConnector() {
    if (!this._wagmiConnector) throw new Error("Connector not initialized");
    return this._wagmiConnector;
  }
  public set wagmiConnector(connector: CreateConnectorFn) {
    this._wagmiConnector = connector;
  }

  public abstract init(): void;

  public async connect(): Promise<`0x${string}` | undefined> {
    const result = await connect(KaiaRpcConnector.getWagmiConfig(), {
      connector: this.wagmiConnector,
    });
    return result.accounts[0];
  }

  public async reconnect() {
    reconnect(KaiaRpcConnector.getWagmiConfig(), {
      connectors: [this.wagmiConnector],
    });
  }
}
