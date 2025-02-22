import KaiaWalletSessionManager from "./KaiaWalletSessionManager.js";

interface IKaiaWalletModuleConfig {
  appName: string;
  walletConnectProjectId: string;
}

class KaiaWalletModuleConfig implements IKaiaWalletModuleConfig {
  public appName: string = "";

  private _walletConnectProjectId?: string;
  public get walletConnectProjectId() {
    if (!this._walletConnectProjectId) {
      throw new Error("WalletConnect project ID not set");
    }
    return this._walletConnectProjectId;
  }
  public set walletConnectProjectId(projectId: string) {
    this._walletConnectProjectId = projectId;
  }

  public init(options: IKaiaWalletModuleConfig) {
    this.appName = options.appName;
    this.walletConnectProjectId = options.walletConnectProjectId;

    KaiaWalletSessionManager.init();
  }
}

export default new KaiaWalletModuleConfig();
