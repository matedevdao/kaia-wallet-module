import { DomNode } from "@common-module/app";

export default interface WalletForKaiaConnector {
  walletId: string;
  walletName: string;
  walletIcon: DomNode;
  connect(): Promise<`0x${string}` | undefined>;
}
