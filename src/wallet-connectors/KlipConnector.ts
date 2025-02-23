// @ts-ignore
import { getResult, prepare, request } from "klip-sdk";

import { Abi } from "abitype";
import QrCode from "qrcode";
import KaiaWalletModuleConfig from "../KaiaWalletModuleConfig.js";
import KlipQrModal from "../components/KlipQrModal.js";
import KlipIcon from "../components/wallet-icons/KlipIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";

class KlipConnector implements WalletForKaiaConnector {
  public walletId = "klip";
  public walletName = "Klip";
  public walletIcon = new KlipIcon();

  private qrModal: KlipQrModal | undefined;

  private async request(title: string, res: any): Promise<any> {
    request(res.request_key, async () => {
      const qr = await QrCode.toDataURL(
        `https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`,
      );
      this.qrModal = new KlipQrModal(title, qr);
    });

    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        const result = await getResult(res.request_key);
        if (result.result) {
          this.qrModal?.remove();
          this.qrModal = undefined;
          clearInterval(interval);
          setTimeout(() => resolve(result.result), 2000);
        }
      }, 1000);
    });
  }

  public async connect(): Promise<`0x${string}` | undefined> {
    const res = await prepare.auth({
      bappName: KaiaWalletModuleConfig.appName,
    });
    return (await this.request("QR 코드로 Klip 접속", res)).klaytn_address;
  }

  public getChainId(): number | undefined {
    //TODO: Implement
    throw new Error("Method not implemented.");
  }

  public switchChain(chainId: number): Promise<number> {
    //TODO: Implement
    throw new Error("Method not implemented.");
  }

  public getAddress(): `0x${string}` | undefined {
    //TODO: Implement
    throw new Error("Method not implemented.");
  }

  public async writeContract(
    parameters: {
      chainId: 8217 | 1001;
      address: `0x${string}`;
      abi: Abi;
      functionName: string;
      args: unknown[];
      account: `0x${string}`;
    },
  ) {
    //TODO: Implement
    throw new Error("Method not implemented.");
  }
}

export default new KlipConnector();
