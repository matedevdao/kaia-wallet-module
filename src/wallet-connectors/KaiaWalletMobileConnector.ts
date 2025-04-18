import { Browser, Store } from "@commonmodule/app";
import { Abi } from "abitype";
import QrCode from "qrcode";
import KaiaWalletModuleConfig from "../KaiaWalletModuleConfig.js";
import KaiaWalletMobileQrModal from "../components/KaiaWalletMobileQrModal.js";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";

class KaiaWalletMobileConnector implements WalletForKaiaConnector {
  public walletId = "kaia-wallet";
  public walletName = "Kaia Wallet";
  public walletIcon = new KaiaWalletIcon();

  private store = new Store("kaia-wallet-mobile-connector");
  private qrModal: KaiaWalletMobileQrModal | undefined;

  private async request(title: string, requestKey: string): Promise<any> {
    let interval: any;
    let resultReceived = false;
    let reject: any;

    if (Browser.isMobileDevice()) {
      location.href = `kaikas://wallet/api?request_key=${requestKey}`;
    } else {
      const qr = await QrCode.toDataURL(
        `https://app.kaiawallet.io/a/${requestKey}`,
      );
      this.qrModal = new KaiaWalletMobileQrModal(title, qr);
      this.qrModal.on("remove", () => {
        this.qrModal = undefined;
        clearInterval(interval);
        if (!resultReceived) {
          reject(new Error("User cancelled"));
        }
      });
    }

    return new Promise((resolve, _reject) => {
      reject = _reject;
      interval = setInterval(async () => {
        const response = await fetch(
          `https://api.kaiawallet.io/api/v1/k/result/${requestKey}`,
        );
        const result = await response.json();
        if (result.result) {
          resultReceived = true;
          this.qrModal?.remove();
          clearInterval(interval);
          setTimeout(() => resolve(result.result), 2000);
        }
      }, 1000);
    });
  }

  private async prepare(data: any) {
    const response = await fetch("https://api.kaiawallet.io/api/v1/k/prepare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        ...{ bapp: { name: KaiaWalletModuleConfig.appName } },
      }),
    });
    return (await response.json()).request_key;
  }

  public async connect(): Promise<`0x${string}` | undefined> {
    const requestKey = await this.prepare({ type: "auth" });
    const address =
      (await this.request("QR 코드로 Kaia Wallet 접속", requestKey))
        .klaytn_address;
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
    throw new Error("Kaia Wallet does not support chain switching");
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
    const requestKey = await this.prepare({
      type: "execute_contract",
      transaction: {
        to: parameters.address,
        abi: JSON.stringify(
          parameters.abi.filter((abi) =>
            abi.type === "function" && abi.name === parameters.functionName
          )[0],
        ),
        params: JSON.stringify((parameters.args ?? []).map(this.processParams)),
        value: (parameters.value === undefined ? 0 : parameters.value)
          .toString(),
      },
    });
    await this.request("스마트 계약 실행", requestKey);
  }

  public async signMessage(_: `0x${string}`, message: string): Promise<string> {
    const requestKey = await this.prepare({ type: "sign", sign: { message } });
    const data = await this.request("QR 코드로 메시지 서명", requestKey);
    return data.signature;
  }
}

export default new KaiaWalletMobileConnector();
