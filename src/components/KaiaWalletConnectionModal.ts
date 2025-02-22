import { StructuredModal } from "@common-module/app-components";

interface ConnectionResult {
  walletId: string;
  walletAddress: `0x${string}`;
}

export default class KaiaWalletConnectionModal extends StructuredModal {
  private resolveConnection?: (result: ConnectionResult) => void;
  private rejectConnection?: (reason: Error) => void;

  constructor() {
    super(".kaia-wallet-connection-modal", false);
  }

  public async waitForLogin(): Promise<ConnectionResult> {
    return new Promise((resolve, reject) => {
      this.resolveConnection = resolve;
      this.rejectConnection = reject;
    });
  }
}
