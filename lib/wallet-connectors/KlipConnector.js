import { getResult, prepare, request } from "klip-sdk";
import { Store } from "@common-module/app";
import QrCode from "qrcode";
import KaiaWalletModuleConfig from "../KaiaWalletModuleConfig.js";
import KlipQrModal from "../components/KlipQrModal.js";
import KlipIcon from "../components/wallet-icons/KlipIcon.js";
class KlipConnector {
    walletId = "klip";
    walletName = "Klip";
    walletIcon = new KlipIcon();
    store = new Store("klip-connector");
    qrModal;
    async request(title, res) {
        request(res.request_key, async () => {
            const qr = await QrCode.toDataURL(`https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`);
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
    async connect() {
        const res = await prepare.auth({
            bappName: KaiaWalletModuleConfig.appName,
        });
        const address = (await this.request("QR 코드로 Klip 접속", res)).klaytn_address;
        this.store.setPermanent("address", address);
        return address;
    }
    async disconnect() {
        this.store.remove("address");
    }
    getChainId() {
        return 8217;
    }
    switchChain() {
        throw new Error("Klip does not support chain switching");
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
        const res = await prepare.executeContract({
            bappName: KaiaWalletModuleConfig.appName,
            to: parameters.address,
            abi: JSON.stringify(parameters.abi.filter((abi) => abi.type === "function" && abi.name === parameters.functionName)[0]),
            params: JSON.stringify((parameters.args ?? []).map(this.processParams)),
            value: (parameters.value === undefined ? 0 : parameters.value).toString(),
        });
        await this.request("스마트 계약 실행", res);
    }
}
export default new KlipConnector();
//# sourceMappingURL=KlipConnector.js.map