import { DomNode } from "@common-module/app";
import {
  Config,
  connect,
  CreateConnectorFn,
  reconnect,
  waitForTransactionReceipt,
  writeContract,
  WriteContractParameters,
} from "@wagmi/core";
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from "viem";
import InsufficientBalanceError from "../errors/InsufficientBalanceError.js";
import KaiaRpcConnector from "../KaiaRpcConnector.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";

export default abstract class WagmiWalletConnector
  implements WalletForKaiaConnector {
  abstract walletId: string;
  abstract walletName: string;
  abstract walletIcon: DomNode;

  private _wagmiConnector?: CreateConnectorFn;
  public get wagmiConnector() {
    if (!this._wagmiConnector) throw new Error("Connector not initialized");
    return this._wagmiConnector;
  }
  public set wagmiConnector(connector: CreateConnectorFn) {
    this._wagmiConnector = connector;
  }

  public abstract init(): void;

  public async connect(): Promise<`0x${string}` | undefined> {
    const result = await connect(KaiaRpcConnector.getWagmiConfig(), {
      connector: this.wagmiConnector,
    });
    return result.accounts[0];
  }

  public async reconnect() {
    reconnect(KaiaRpcConnector.getWagmiConfig(), {
      connectors: [this.wagmiConnector],
    });
  }

  public async writeContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
    args extends ContractFunctionArgs<
      abi,
      "nonpayable" | "payable",
      functionName
    >,
    chainId extends Config["chains"][number]["id"],
  >(
    parameters: WriteContractParameters<
      abi,
      functionName,
      args,
      Config,
      chainId
    >,
  ) {
    if (parameters.value) {
      const walletAddress = this.getAddress();
      if (walletAddress) {
        const balance = await this.getBalance(
          parameters.chainId,
          walletAddress,
        );
        if (balance < parameters.value) {
          throw new InsufficientBalanceError();
        }
      }
    }

    const hash = await writeContract(
      KaiaRpcConnector.getWagmiConfig(),
      parameters,
    );

    await waitForTransactionReceipt(
      KaiaRpcConnector.getWagmiConfig(),
      { hash },
    );
  }
}
