import { el, msg } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import KaiaWalletButtonGrouop from "./KaiaWalletButtonGrouop.js";
export default class KaiaWalletConnectionModal extends StructuredModal {
    resolveConnection;
    rejectConnection;
    constructor() {
        super(".kaia-wallet-connection-modal", false);
        this.appendToHeader(el("h1", msg("kaia_wallet_connection_modal.title")));
        this.appendToMain(new KaiaWalletButtonGrouop("Connect", (walletConnector) => this.handleConnect(walletConnector)));
        this.appendToFooter(new Button(".cancel", {
            title: msg("kaia_wallet_connection_modal.button.cancel"),
            onClick: () => this.remove(),
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