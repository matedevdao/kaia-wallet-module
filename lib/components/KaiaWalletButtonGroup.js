import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";
import UniversalKaiaWalletConnector from "../UniversalKaiaWalletConnector.js";
import { msg } from "@common-module/app";
export default class KaiaWalletButtonGroup extends ButtonGroup {
    constructor(buttonText, onWalletSelect) {
        super();
        this.append(...UniversalKaiaWalletConnector.connectors.map((connector) => new Button({
            type: ButtonType.Outlined,
            icon: connector.walletIcon.clone(),
            title: msg("kaia_wallet_button_group.button_title", {
                buttonText,
                walletName: connector.walletName,
            }),
            onClick: () => onWalletSelect(connector),
        })));
    }
}
//# sourceMappingURL=KaiaWalletButtonGroup.js.map