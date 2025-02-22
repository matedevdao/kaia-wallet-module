import { DomNode } from "@common-module/app";

export default interface WalletForKaiaConnector {
  walletName: string;
  walletIcon: DomNode;
  connect(): Promise<void>;
  disconnect(): void;
}
