import { connect, reconnect, waitForTransactionReceipt, writeContract, } from "@wagmi/core";
import InsufficientBalanceError from "../errors/InsufficientBalanceError.js";
import KaiaRpcConnector from "../KaiaRpcConnector.js";
export default class WagmiWalletConnector {
    _wagmiConnector;
    get wagmiConnector() {
        if (!this._wagmiConnector)
            throw new Error("Connector not initialized");
        return this._wagmiConnector;
    }
    set wagmiConnector(connector) {
        this._wagmiConnector = connector;
    }
    async connect() {
        const result = await connect(KaiaRpcConnector.getWagmiConfig(), {
            connector: this.wagmiConnector,
        });
        return result.accounts[0];
    }
    async reconnect() {
        reconnect(KaiaRpcConnector.getWagmiConfig(), {
            connectors: [this.wagmiConnector],
        });
    }
    async writeContract(parameters) {
        if (parameters.value) {
            const walletAddress = this.getAddress();
            if (walletAddress) {
                const balance = await this.getBalance(parameters.chainId, walletAddress);
                if (balance < parameters.value) {
                    throw new InsufficientBalanceError();
                }
            }
        }
        const hash = await writeContract(KaiaRpcConnector.getWagmiConfig(), parameters);
        await waitForTransactionReceipt(KaiaRpcConnector.getWagmiConfig(), { hash });
    }
}
//# sourceMappingURL=WagmiWalletConnector.js.map