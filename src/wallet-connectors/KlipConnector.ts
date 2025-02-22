import WalletForKaiaConnector from "./WalletForKaiaConnector.js";
import QrCode from "qrcode";

// @ts-ignore
import { getResult, prepare, request } from "klip-sdk";

class KlipConnector implements WalletForKaiaConnector {}

export default new KlipConnector();
