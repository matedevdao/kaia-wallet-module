import { StructuredModal } from "@common-module/app-components";

export default class KlipQrModal extends StructuredModal {
  constructor(title: string, qr: string) {
    super(".klip-qr-modal");
  }
}
