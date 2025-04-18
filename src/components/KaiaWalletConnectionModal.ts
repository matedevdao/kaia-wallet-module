import { el, msg } from "@commonmodule/app";
import { Button, StructuredModal } from "@commonmodule/app-components";
import WalletForKaiaConnector from "../wallet-connectors/WalletForKaiaConnector.js";
import KaiaWalletButtonGrouop from "./KaiaWalletButtonGroup.js";

interface ConnectionResult {
  walletId: string;
  walletAddress: `0x${string}`;
}

export default class KaiaWalletConnectionModal extends StructuredModal {
  private resolveConnection?: (result: ConnectionResult) => void;
  private rejectConnection?: (reason: Error) => void;

  constructor() {
    super(".kaia-wallet-connection-modal", false);

    this.appendToHeader(el("h1", msg("kaia_wallet_connection_modal.title")));
    this.appendToMain(
      new KaiaWalletButtonGrouop(
        msg("kaia_wallet_connection_modal.button.connect"),
        (walletConnector) => this.handleConnect(walletConnector),
      ),
    );
    this.appendToFooter(
      new Button(".cancel", {
        title: msg("kaia_wallet_connection_modal.button.cancel"),
        onClick: () => this.remove(),
      }),
    );

    this.on(
      "remove",
      () => this.rejectConnection?.(new Error("Login canceled by user")),
    );
  }

  private async handleConnect(walletConnector: WalletForKaiaConnector) {
    const walletAddress = await walletConnector.connect();
    if (!walletAddress) throw new Error("No accounts found");

    this.resolveConnection?.({
      walletId: walletConnector.walletId,
      walletAddress,
    });

    this.rejectConnection = undefined;
    this.remove();
  }

  public async waitForLogin(): Promise<ConnectionResult> {
    return new Promise((resolve, reject) => {
      this.resolveConnection = resolve;
      this.rejectConnection = reject;
    });
  }
}
