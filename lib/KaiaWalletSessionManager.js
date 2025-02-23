import { Store } from "@common-module/app";
import { AppCompConfig, ConfirmDialog, ErrorDialog, } from "@common-module/app-components";
import { EventContainer } from "@common-module/ts";
import { ContractFunctionExecutionError } from "viem";
import KaiaWalletConnectionModal from "./components/KaiaWalletConnectionModal.js";
import InsufficientBalanceError from "./errors/InsufficientBalanceError.js";
import KaiaWalletModuleConfig from "./KaiaWalletModuleConfig.js";
import UniversalKaiaWalletConnector from "./UniversalKaiaWalletConnector.js";
class KaiaWalletSessionManager extends EventContainer {
    store = new Store("kaia-wallet-session-manager");
    getConnectedWallet() {
        return this.store.get("connectedWallet");
    }
    getConnectedAddress() {
        return this.store.get("connectedAddress");
    }
    isConnected() {
        return !!this.getConnectedWallet() && !!this.getConnectedAddress();
    }
    init() {
        UniversalKaiaWalletConnector.init(this.getConnectedWallet());
    }
    setConnectedWalletInfo(walletId, walletAddress) {
        const currentIsConnected = this.isConnected();
        this.store.setPermanent("connectedWallet", walletId);
        this.store.setPermanent("connectedAddress", walletAddress);
        if (currentIsConnected !== this.isConnected()) {
            this.emit("sessionChanged", this.isConnected());
        }
    }
    async connect() {
        this.disconnect();
        const result = await new KaiaWalletConnectionModal().waitForLogin();
        this.setConnectedWalletInfo(result.walletId, result.walletAddress);
    }
    disconnect() {
        UniversalKaiaWalletConnector.disconnect();
        const currentIsConnected = this.isConnected();
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        if (currentIsConnected !== this.isConnected()) {
            this.emit("sessionChanged", this.isConnected());
        }
    }
    async writeContract(parameters) {
        if (!this.getConnectedWallet() ||
            !this.getConnectedAddress() ||
            !UniversalKaiaWalletConnector.getAddress(this.getConnectedWallet())) {
            this.showConnectWalletDialog();
            throw new Error("Not connected");
        }
        if (UniversalKaiaWalletConnector.getAddress(this.getConnectedWallet()) !==
            this.getConnectedAddress()) {
            this.showWalletMismatchDialog();
            throw new Error("Wallet address mismatch");
        }
        const chainId = UniversalKaiaWalletConnector.getChainId();
        if (chainId !== parameters.chainId) {
            this.showSwitchNetworkDialog(chainId, parameters.chainId);
            throw new Error("Network mismatch");
        }
        try {
            parameters.account = this.getConnectedAddress();
            return await UniversalKaiaWalletConnector.writeContract(parameters);
        }
        catch (error) {
            if (error instanceof InsufficientBalanceError) {
                const chain = KaiaWalletModuleConfig.chains.find((c) => c.id === parameters.chainId);
                if (chain?.faucetUrl) {
                    const symbol = chain.nativeCurrency.symbol;
                    new ConfirmDialog(".insufficient-balance", {
                        icon: new AppCompConfig.WarningIcon(),
                        title: "Insufficient Balance",
                        message: `You do not have enough balance to execute this transaction. Would you like to get some ${symbol} from the faucet?`,
                        confirmButtonTitle: `Get ${symbol}`,
                        onConfirm: () => window.open(chain.faucetUrl, "_blank"),
                    });
                }
                else {
                    new ErrorDialog({
                        title: "Insufficient Balance",
                        message: "You do not have enough balance to execute this transaction.",
                    });
                }
            }
            else if (error instanceof ContractFunctionExecutionError) {
                const match = error.message.match(/The current chain of the wallet \(id: (\d+)\) does not match the target chain for the transaction \(id: (\d+)/);
                if (match) {
                    this.showSwitchNetworkDialog(parseInt(match[1]), parseInt(match[2]));
                }
                else {
                    new ErrorDialog({
                        title: "Transaction Failed",
                        message: error.message,
                    });
                }
            }
            else {
                new ErrorDialog({
                    title: "Transaction Failed",
                    message: error.message,
                });
            }
            throw error;
        }
    }
}
export default new KaiaWalletSessionManager();
//# sourceMappingURL=KaiaWalletSessionManager.js.map