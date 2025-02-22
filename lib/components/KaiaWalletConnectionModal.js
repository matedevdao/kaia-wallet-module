import { StructuredModal } from "@common-module/app-components";
export default class KaiaWalletConnectionModal extends StructuredModal {
    resolveConnection;
    rejectConnection;
    constructor() {
        super(".kaia-wallet-connection-modal", false);
    }
    async waitForLogin() {
        return new Promise((resolve, reject) => {
            this.resolveConnection = resolve;
            this.rejectConnection = reject;
        });
    }
}
//# sourceMappingURL=KaiaWalletConnectionModal.js.map