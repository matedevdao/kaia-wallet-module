import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";
import UniversalKaiaWalletConnector from "../UniversalKaiaWalletConnector.js";
export default class KaiaWalletButtonGrouop extends ButtonGroup {
    constructor(buttonText, onWalletSelect) {
        super();
        this.append(...UniversalKaiaWalletConnector.connectors.map((connector) => new Button({
            type: ButtonType.Outlined,
            icon: connector.walletIcon.clone(),
            title: `${buttonText} with ${connector.walletName}`,
            onClick: () => onWalletSelect(connector),
        })));
    }
}
//# sourceMappingURL=KaiaWalletButtonGrouop.js.map