import KlipIcon from "../components/wallet-icons/KlipIcon.js";
import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
declare class KlipConnector implements WalletForKaiaConnector {
    walletId: string;
    walletName: string;
    walletIcon: KlipIcon;
    private qrModal;
    private request;
    connect(): Promise<`0x${string}` | undefined>;
}
declare const _default: KlipConnector;
export default _default;
//# sourceMappingURL=KlipConnector.d.ts.map