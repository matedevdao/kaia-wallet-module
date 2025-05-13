import { el, msg } from "@commonmodule/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  StructuredModal,
} from "@commonmodule/app-components";

export default class KlipQrModal extends StructuredModal {
  constructor(title: string, qr: string) {
    super(".klip-qr-modal");

    this.appendToHeader(
      el("h1", title),
      new Button(".close", {
        type: ButtonType.Icon,
        icon: new AppCompConfig.CloseIcon(),
        onPress: () => this.remove(),
      }),
    );

    this.appendToMain(
      el(".qr", el("img", { src: qr })),
      el("p", msg("klip_qr_modal.guide")),
    );

    this.appendToFooter(
      new Button({
        title: msg("klip_qr_modal.button.cancel"),
        onPress: () => this.remove(),
      }),
    );
  }
}
