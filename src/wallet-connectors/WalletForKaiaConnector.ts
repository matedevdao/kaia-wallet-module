import { DomNode } from "@common-module/app";
import { Abi } from "viem";

export default interface WalletForKaiaConnector {
  walletId: string;
  walletName: string;
  walletIcon: DomNode;
  connect(): Promise<`0x${string}` | undefined>;
  getChainId(): number | undefined;
  switchChain(chainId: number): Promise<number>;
  getAddress(): `0x${string}` | undefined;
  writeContract(parameters: {
    chainId: 8217 | 1001;
    address: `0x${string}`;
    abi: Abi;
    functionName: string;
    args: unknown[];
    account: `0x${string}`;
  }): Promise<void>;
}
