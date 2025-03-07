import { Store } from "@common-module/app";
import QrCode from "qrcode";
import KaiaWalletModuleConfig from "../KaiaWalletModuleConfig.js";
import KaiaWalletMobileQrModal from "../components/KaiaWalletMobileQrModal.js";
import KaiaWalletIcon from "../components/wallet-icons/KaiaWalletIcon.js";
class KaiaWalletMobileConnector {
    walletId = "kaia-wallet";
    walletName = "Kaia Wallet";
    walletIcon = new KaiaWalletIcon();
    store = new Store("kaia-wallet-mobile-connector");
    qrModal;
    async request(title, requestKey) {
        let interval;
        let resultReceived = false;
        let reject;
        const qr = await QrCode.toDataURL(`https://app.kaiawallet.io/a/${requestKey}`);
        this.qrModal = new KaiaWalletMobileQrModal(title, qr);
        this.qrModal.on("remove", () => {
            this.qrModal = undefined;
            clearInterval(interval);
            if (!resultReceived) {
                reject(new Error("User cancelled"));
            }
        });
        return new Promise((resolve, _reject) => {
            reject = _reject;
            interval = setInterval(async () => {
                const response = await fetch(`https://api.kaiawallet.io/api/v1/k/result/${requestKey}`);
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
    async prepare(data) {
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
    async connect() {
        const requestKey = await this.prepare({ type: "auth" });
        const address = (await this.request("QR 코드로 Kaia Wallet 접속", requestKey))
            .klaytn_address;
        return address;
    }
    async disconnect() {
        this.store.remove("address");
    }
    getChainId() {
        return 8217;
    }
    switchChain() {
        throw new Error("Kaia Wallet does not support chain switching");
    }
    getAddress() {
        return this.store.get("address");
    }
    processParams(param) {
        if (Array.isArray(param)) {
            return param.map(this.processParams);
        }
        else if (typeof param === "bigint") {
            return param.toString();
        }
        else if (typeof param === "object" && param !== null) {
            const processedObject = {};
            Object.keys(param).forEach((key) => {
                processedObject[key] = this.processParams(param[key]);
            });
            return processedObject;
        }
        return param;
    }
    async writeContract(parameters) {
        const requestKey = await this.prepare({
            type: "execute_contract",
            transaction: {
                to: parameters.address,
                abi: JSON.stringify(parameters.abi.filter((abi) => abi.type === "function" && abi.name === parameters.functionName)[0]),
                params: JSON.stringify((parameters.args ?? []).map(this.processParams)),
                value: (parameters.value === undefined ? 0 : parameters.value)
                    .toString(),
            },
        });
        await this.request("스마트 계약 실행", requestKey);
    }
    async signMessage(_, message) {
        const requestKey = await this.prepare({ type: "sign", sign: { message } });
        const result = await this.request("QR 코드로 메시지 서명", requestKey);
        return result.signature;
    }
}
export default new KaiaWalletMobileConnector();
//# sourceMappingURL=KaiaWalletMobileConnector.js.map