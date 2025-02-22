import { EventContainer } from "@common-module/ts";
import { Config, EstimateGasParameters, ReadContractParameters, WriteContractParameters } from "@wagmi/core";
import { type Abi, type ContractFunctionArgs, type ContractFunctionName, DecodeEventLogReturnType } from "viem";
declare class WalletSessionManager extends EventContainer<{
    sessionChanged: (connected: boolean) => void;
}> {
    private store;
    getConnectedWallet(): string | undefined;
    getConnectedAddress(): `0x${string}` | undefined;
    isConnected(): boolean;
    init(): void;
    setConnectedWalletInfo(walletId: string, walletAddress: `0x${string}`): void;
    connect(): Promise<void>;
    disconnect(): void;
    getBalance(chainId: number, walletAddress: `0x${string}`): Promise<any>;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<any>;
    estimateGas<chainId extends Config["chains"][number]["id"]>(parameters: EstimateGasParameters<Config, chainId>): Promise<any>;
    writeContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainId extends Config["chains"][number]["id"]>(parameters: WriteContractParameters<abi, functionName, args, Config, chainId>): Promise<DecodeEventLogReturnType[]>;
    private showConnectWalletDialog;
    private showWalletMismatchDialog;
    private showSwitchNetworkDialog;
}
declare const _default: WalletSessionManager;
export default _default;
//# sourceMappingURL=WalletSessionManager.d.ts.map