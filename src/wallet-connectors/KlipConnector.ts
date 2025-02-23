// @ts-ignore
import { getResult, prepare, request } from "klip-sdk";

import { Store } from "@common-module/app";
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

  private store = new Store("klip-connector");
  private qrModal: KlipQrModal | undefined;

  private async request(title: string, res: any): Promise<any> {
    let interval: any;
    let resultReceived = false;
    let reject: any;

    request(res.request_key, undefined, async () => {
      const qr = await QrCode.toDataURL(
        `https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`,
      );
      this.qrModal = new KlipQrModal(title, qr);
      this.qrModal.on("remove", () => {
        this.qrModal = undefined;
        clearInterval(interval);
        if (!resultReceived) {
          reject(new Error("User cancelled"));
        }
      });
    });

    return new Promise((resolve, _reject) => {
      reject = _reject;
      interval = setInterval(async () => {
        const result = await getResult(res.request_key);
        if (result.result) {
          resultReceived = true;
          this.qrModal?.remove();
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
    const address =
      (await this.request("QR 코드로 Klip 접속", res)).klaytn_address;
    this.store.setPermanent("address", address);
    return address;
  }

  public async disconnect() {
    this.store.remove("address");
  }

  public getChainId(): number | undefined {
    return 8217;
  }

  public switchChain(): Promise<number> {
    throw new Error("Klip does not support chain switching");
  }

  public getAddress(): `0x${string}` | undefined {
    return this.store.get<`0x${string}`>("address");
  }

  private processParams(param: any): any {
    if (Array.isArray(param)) {
      return param.map(this.processParams);
    } else if (typeof param === "bigint") {
      return param.toString();
    } else if (typeof param === "object" && param !== null) {
      const processedObject: any = {};
      Object.keys(param).forEach((key) => {
        processedObject[key] = this.processParams(param[key]);
      });
      return processedObject;
    }
    return param;
  }

  public async writeContract(
    parameters: {
      chainId: 8217 | 1001;
      address: `0x${string}`;
      abi: Abi;
      functionName: string;
      args: unknown[];
      account: `0x${string}`;
      value?: bigint;
    },
  ) {
    const res = await prepare.executeContract({
      bappName: KaiaWalletModuleConfig.appName,
      to: parameters.address,
      abi: JSON.stringify(
        parameters.abi.filter((abi) =>
          abi.type === "function" && abi.name === parameters.functionName
        )[0],
      ),
      params: JSON.stringify((parameters.args ?? []).map(this.processParams)),
      value: (parameters.value === undefined ? 0 : parameters.value).toString(),
    });
    await this.request("스마트 계약 실행", res);
  }
}

export default new KlipConnector();
