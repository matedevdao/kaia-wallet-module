import { el, msg } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  StructuredModal,
} from "@common-module/app-components";

export default class KaiaWalletMobileQrModal extends StructuredModal {
  constructor(title: string, qr: string) {
    super(".kaia-wallet-mobile-qr-modal");

    this.appendToHeader(
      el("h1", title),
      new Button(".close", {
        type: ButtonType.Icon,
        icon: new AppCompConfig.CloseIcon(),
        onClick: () => this.remove(),
      }),
    );

    this.appendToMain(
      el(".qr", el("img", { src: qr })),
      el("p", msg("kaia_wallet_mobile_qr_modal.guide")),
    );

    this.appendToFooter(
      new Button({
        title: msg("kaia_wallet_mobile_qr_modal.button.cancel"),
        onClick: () => this.remove(),
      }),
    );
  }
}
