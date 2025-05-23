import { el, msg } from "@commonmodule/app";
import { Button, StructuredModal } from "@commonmodule/app-components";
import KaiaWalletButtonGrouop from "./KaiaWalletButtonGroup.js";
export default class KaiaWalletConnectionModal extends StructuredModal {
    resolveConnection;
    rejectConnection;
    constructor() {
        super(".kaia-wallet-connection-modal", false);
        this.appendToHeader(el("h1", msg("kaia_wallet_connection_modal.title")));
        this.appendToMain(new KaiaWalletButtonGrouop(msg("kaia_wallet_connection_modal.button.connect"), (walletConnector) => this.handleConnect(walletConnector)));
        this.appendToFooter(new Button(".cancel", {
            title: msg("kaia_wallet_connection_modal.button.cancel"),
            onPress: () => this.remove(),
        }));
        this.on("remove", () => this.rejectConnection?.(new Error("Login canceled by user")));
    }
    async handleConnect(walletConnector) {
        const walletAddress = await walletConnector.connect();
        if (!walletAddress)
            throw new Error("No accounts found");
        this.resolveConnection?.({
            walletId: walletConnector.walletId,
            walletAddress,
        });
        this.rejectConnection = undefined;
        this.remove();
    }
    async waitForLogin() {
        return new Promise((resolve, reject) => {
            this.resolveConnection = resolve;
            this.rejectConnection = reject;
        });
    }
}
//# sourceMappingURL=KaiaWalletConnectionModal.js.map