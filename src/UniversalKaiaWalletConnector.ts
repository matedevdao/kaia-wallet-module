import { Browser } from "@commonmodule/app";
import { Abi } from "viem";
import KaiaWalletExtensionConnector from "./wallet-connectors/KaiaWalletExtensionConnector.js";
import KaiaWalletMobileConnector from "./wallet-connectors/KaiaWalletMobileConnector.js";
import KlipConnector from "./wallet-connectors/KlipConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WagmiWalletConnector from "./wallet-connectors/WagmiWalletConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
import WalletForKaiaConnector from "./wallet-connectors/WalletForKaiaConnector.js";

class UniversalKaiaWalletConnector {
  public connectors: WalletForKaiaConnector[] = [
    !Browser.isMobileDevice() && (window as any).klaytn
      ? KaiaWalletExtensionConnector
      : KaiaWalletMobileConnector,
    KlipConnector,
    MetaMaskConnector,
    WalletConnectConnector,
  ];

  public init(walletId?: string) {
    for (const connector of this.connectors) {
      if (connector instanceof WagmiWalletConnector) {
        connector.init();
        if (connector.walletId === walletId) {
          connector.reconnect();
        }
      }
    }
  }

  public disconnect() {
    for (const connector of this.connectors) {
      connector.disconnect();
    }
  }

  private getWalletConnector(walletId: string) {
    for (const connector of this.connectors) {
      if (connector.walletId === walletId) {
        return connector;
      }
    }
    throw new Error("Wallet not found");
  }

  public getChainId(walletId: string) {
    const connector = this.getWalletConnector(walletId);
    return connector.getChainId();
  }

  public async switchChain(walletId: string, chainId: number) {
    const connector = this.getWalletConnector(walletId);
    return connector.switchChain(chainId);
  }

  public getAddress(walletId: string) {
    const connector = this.getWalletConnector(walletId);
    return connector.getAddress();
  }

  public async writeContract(walletId: string, parameters: {
    chainId: 8217 | 1001;
    address: `0x${string}`;
    abi: Abi;
    functionName: string;
    args: unknown[];
    account: `0x${string}`;
    value?: bigint;
  }) {
    const connector = this.getWalletConnector(walletId);
    return connector.writeContract(parameters);
  }
}

export default new UniversalKaiaWalletConnector();
