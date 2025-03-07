import { el, msg } from "@common-module/app";
import { AppCompConfig, Button, ButtonType, StructuredModal, } from "@common-module/app-components";
export default class KlipQrModal extends StructuredModal {
    constructor(title, qr) {
        super(".klip-qr-modal");
        this.appendToHeader(el("h1", title), new Button(".close", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.CloseIcon(),
            onClick: () => this.remove(),
        }));
        this.appendToMain(el(".qr", el("img", { src: qr })), el("p", msg("klip_qr_modal.guide")));
        this.appendToFooter(new Button({
            title: msg("klip_qr_modal.button.cancel"),
            onClick: () => this.remove(),
        }));
    }
}
//# sourceMappingURL=KlipQrModal%20copy.js.map