import KlipIcon from "../components/wallet-icons/KlipIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
declare class KlipConnector implements WalletForKaiaConnector {
    walletName: string;
    walletIcon: KlipIcon;
    private qrModal;
    private request;
    connect(): Promise<string | undefined>;
}
declare const _default: KlipConnector;
export default _default;
//# sourceMappingURL=KlipConnector.d.ts.map