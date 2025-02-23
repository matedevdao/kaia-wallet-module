import { Store } from "@common-module/app";
import {
  AlertDialog,
  AppCompConfig,
  ConfirmDialog,
  ErrorDialog,
} from "@common-module/app-components";
import { EventContainer } from "@common-module/ts";
import { getChainById } from "@common-module/wallet-utils";
import { Abi, ContractFunctionExecutionError } from "viem";
import KaiaWalletConnectionModal from "./components/KaiaWalletConnectionModal.js";
import InsufficientBalanceError from "./errors/InsufficientBalanceError.js";
import KaiaRpcConnector from "./KaiaRpcConnector.js";
import UniversalKaiaWalletConnector from "./UniversalKaiaWalletConnector.js";

class KaiaWalletSessionManager extends EventContainer<{
  sessionChanged: (connected: boolean) => void;
}> {
  private store = new Store("kaia-wallet-session-manager");

  public getConnectedWallet() {
    return this.store.get<string>("connectedWallet");
  }
  public getConnectedAddress() {
    return this.store.get<`0x${string}`>("connectedAddress");
  }
  public isConnected() {
    return !!this.getConnectedWallet() && !!this.getConnectedAddress();
  }

  public init() {
    UniversalKaiaWalletConnector.init(this.getConnectedWallet());
  }

  public setConnectedWalletInfo(
    walletId: string,
    walletAddress: `0x${string}`,
  ) {
    const currentIsConnected = this.isConnected();

    this.store.setPermanent("connectedWallet", walletId);
    this.store.setPermanent("connectedAddress", walletAddress);

    if (currentIsConnected !== this.isConnected()) {
      this.emit("sessionChanged", this.isConnected());
    }
  }

  public async connect() {
    this.disconnect();
    const result = await new KaiaWalletConnectionModal().waitForLogin();
    this.setConnectedWalletInfo(result.walletId, result.walletAddress);
  }

  public disconnect() {
    UniversalKaiaWalletConnector.disconnect();

    const currentIsConnected = this.isConnected();

    this.store.remove("connectedWallet");
    this.store.remove("connectedAddress");

    if (currentIsConnected !== this.isConnected()) {
      this.emit("sessionChanged", this.isConnected());
    }
  }

  public async writeContract(parameters: {
    chainId: 8217 | 1001;
    address: `0x${string}`;
    abi: Abi;
    functionName: string;
    args: unknown[];
  }) {
    const walletId = this.getConnectedWallet();

    if (
      !walletId ||
      !this.getConnectedAddress() ||
      !UniversalKaiaWalletConnector.getAddress(walletId)
    ) {
      this.showConnectWalletDialog();
      throw new Error("Not connected");
    }

    if (
      UniversalKaiaWalletConnector.getAddress(walletId) !==
        this.getConnectedAddress()
    ) {
      this.showWalletMismatchDialog();
      throw new Error("Wallet address mismatch");
    }

    const chainId = UniversalKaiaWalletConnector.getChainId(walletId);
    if (chainId !== parameters.chainId) {
      this.showSwitchNetworkDialog(chainId, parameters.chainId);
      throw new Error("Network mismatch");
    }

    try {
      (parameters as any).account = this.getConnectedAddress() as any;
      return await UniversalKaiaWalletConnector.writeContract(
        walletId,
        parameters as any,
      );
    } catch (error: any) {
      if (error instanceof InsufficientBalanceError) {
        const chain = KaiaRpcConnector.getChains().find((c) =>
          c.id === parameters.chainId
        );
        if (chain?.faucetUrl) {
          const symbol = chain.nativeCurrency.symbol;

          new ConfirmDialog(".insufficient-balance", {
            icon: new AppCompConfig.WarningIcon(),
            title: "Insufficient Balance",
            message:
              `You do not have enough balance to execute this transaction. Would you like to get some ${symbol} from the faucet?`,
            confirmButtonTitle: `Get ${symbol}`,
            onConfirm: () => window.open(chain.faucetUrl, "_blank"),
          });
        } else {
          new ErrorDialog({
            title: "Insufficient Balance",
            message:
              "You do not have enough balance to execute this transaction.",
          });
        }
      } else if (error instanceof ContractFunctionExecutionError) {
        const match = error.message.match(
          /The current chain of the wallet \(id: (\d+)\) does not match the target chain for the transaction \(id: (\d+)/,
        );
        if (match) {
          this.showSwitchNetworkDialog(parseInt(match[1]), parseInt(match[2]));
        } else {
          new ErrorDialog({
            title: "Transaction Failed",
            message: error.message,
          });
        }
      } else {
        new ErrorDialog({
          title: "Transaction Failed",
          message: error.message,
        });
      }

      throw error;
    }
  }

  private showConnectWalletDialog() {
    new ConfirmDialog(".connect-wallet", {
      icon: new AppCompConfig.WarningIcon(),
      title: "Connect Wallet",
      message:
        "You need to connect your wallet to execute this transaction. Would you like to connect your wallet now?",
      confirmButtonTitle: "Connect Wallet",
      onConfirm: () => {
        this.connect();
      },
    });
  }

  private showWalletMismatchDialog() {
    const walletId = this.getConnectedWallet();
    const currentWalletAddress = walletId
      ? UniversalKaiaWalletConnector.getAddress(walletId)
      : undefined;
    const requiredWalletAddress = this.getConnectedAddress();

    new ConfirmDialog(".wallet-mismatch", {
      icon: new AppCompConfig.WarningIcon(),
      title: "Wallet Address Mismatch",
      message:
        `Your current wallet address (${currentWalletAddress}) differs from the connected wallet address (${requiredWalletAddress}). Would you like to reconnect your wallet with the correct address?`,
      confirmButtonTitle: "Reconnect Wallet",
      onConfirm: () => {
        this.connect();
      },
    });
  }

  private showSwitchNetworkDialog(
    currentChainId: number | undefined,
    targetChainId: number,
  ) {
    const currentChainName = currentChainId
      ? getChainById(currentChainId)?.name ?? "Unknown"
      : "Unknown";
    const targetChainName = getChainById(targetChainId)?.name ?? "Unknown";

    new ConfirmDialog(".switch-network", {
      icon: new AppCompConfig.WarningIcon(),
      title: "Switch Network",
      message:
        `You are currently connected to ${currentChainName}. Unable to execute transaction on ${targetChainName}. Would you like to switch to ${targetChainName}?`,
      confirmButtonTitle: "Switch Network",
      onConfirm: async () => {
        const walletId = this.getConnectedWallet();
        if (!walletId) {
          throw new Error("Wallet not connected");
        }

        const changedChainId = await UniversalKaiaWalletConnector.switchChain(
          walletId,
          targetChainId,
        );

        if (changedChainId !== targetChainId) {
          new ErrorDialog({
            title: "Network Switch Failed",
            message: "Failed to switch network",
          });

          throw new Error("Failed to switch network");
        } else {
          new AlertDialog({
            icon: new AppCompConfig.SuccessIcon(),
            title: "Network Switched",
            message: `You have successfully switched to ${targetChainName}.`,
          });
        }
      },
    });
  }
}

export default new KaiaWalletSessionManager();
