import { DomNode } from "@common-module/app";
import { Config, connect, CreateConnectorFn } from "@wagmi/core";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";

export default abstract class WagmiWalletConnector
  implements WalletForKaiaConnector {
  abstract walletName: string;
  abstract walletIcon: DomNode;

  private _config?: Config;
  protected get config() {
    if (!this._config) throw new Error("Config not initialized");
    return this._config;
  }
  protected set config(config: Config) {
    this._config = config;
  }

  private _wagmiConnector?: CreateConnectorFn;
  public get wagmiConnector() {
    if (!this._wagmiConnector) throw new Error("Connector not initialized");
    return this._wagmiConnector;
  }
  public set wagmiConnector(connector: CreateConnectorFn) {
    this._wagmiConnector = connector;
  }

  public abstract init(config: Config): void;

  public async connect(): Promise<string | undefined> {
    const result = await connect(this.config, {
      connector: this.wagmiConnector,
    });
    return result.accounts[0];
  }
}
