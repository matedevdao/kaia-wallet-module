import { createConfig, http, readContract, } from "@wagmi/core";
import { kaia, kairos } from "@wagmi/core/chains";
class KaiaRpcConnector {
    chains = [kaia, kairos];
    config = createConfig({
        chains: this.chains,
        transports: Object.fromEntries(this.chains.map((chain) => [chain.id, http()])),
    });
    async readContract(parameters) {
        return await readContract(this.config, parameters);
    }
}
export default new KaiaRpcConnector();
//# sourceMappingURL=KaiaRpcConnector.js.map