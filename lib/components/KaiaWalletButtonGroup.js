import { msg } from "@commonmodule/app";
import { Button, ButtonGroup, ButtonType } from "@commonmodule/app-components";
import UniversalKaiaWalletConnector from "../UniversalKaiaWalletConnector.js";
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
            onPress: () => onWalletSelect(connector),
        })));
    }
}
//# sourceMappingURL=KaiaWalletButtonGroup.js.map