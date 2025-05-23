import { Dom } from "@commonmodule/app";
import { Config, CreateConnectorFn, WriteContractParameters } from "@wagmi/core";
import { type Abi, type ContractFunctionArgs, type ContractFunctionName } from "viem";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
export default abstract class WagmiWalletConnector implements WalletForKaiaConnector {
    abstract walletId: string;
    abstract walletName: string;
    abstract walletIcon: Dom;
    private _wagmiConnector?;
    get wagmiConnector(): CreateConnectorFn;
    set wagmiConnector(connector: CreateConnectorFn);
    abstract init(): void;
    connect(): Promise<`0x${string}` | undefined>;
    reconnect(): Promise<void>;
    disconnect(): void;
    getChainId(): number | undefined;
    switchChain(chainId: number): Promise<number>;
    getAddress(): `0x${string}` | undefined;
    private getBalance;
    writeContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainId extends Config["chains"][number]["id"]>(parameters: WriteContractParameters<abi, functionName, args, Config, chainId>): Promise<void>;
    signMessage(walletAddress: `0x${string}`, message: string): Promise<`0x${string}`>;
}
//# sourceMappingURL=WagmiWalletConnector.d.ts.map