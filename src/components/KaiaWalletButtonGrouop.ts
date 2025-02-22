import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";
import UniversalKaiaWalletConnector from "../UniversalKaiaWalletConnector.js";
import WalletForKaiaConnector from "../wallet-connectors/WalletForKaiaConnector.js";

export default class KaiaWalletButtonGrouop extends ButtonGroup {
  constructor(
    buttonText: string,
    onWalletSelect: (walletConnector: WalletForKaiaConnector) => void,
  ) {
    super();
    this.append(
      ...UniversalKaiaWalletConnector.connectors.map((connector) =>
        new Button({
          type: ButtonType.Outlined,
          icon: connector.walletIcon.clone(),
          title: `${buttonText} with ${connector.walletName}`,
          onClick: () => onWalletSelect(connector),
        })
      ),
    );
  }
}
