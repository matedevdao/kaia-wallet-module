import { Button, ButtonGroup, ButtonType } from "@commonmodule/app-components";
import UniversalKaiaWalletConnector from "../UniversalKaiaWalletConnector.js";
import WalletForKaiaConnector from "../wallet-connectors/WalletForKaiaConnector.js";
import { msg } from "@commonmodule/app";

export default class KaiaWalletButtonGroup extends ButtonGroup {
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
          title: msg("kaia_wallet_button_group.button_title", {
            buttonText,
            walletName: connector.walletName,
          }),
          onClick: () => onWalletSelect(connector),
        })
      ),
    );
  }
}
