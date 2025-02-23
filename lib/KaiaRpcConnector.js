import { createConfig, http, readContract, } from "@wagmi/core";
import { kaia, kairos } from "@wagmi/core/chains";
class KaiaRpcConnector {
    chains = [kaia, {
            ...kairos,
            faucetUrl: "https://www.kaia.io/faucet",
        }];
    config = createConfig({
        chains: this.chains,
        transports: Object.fromEntries(this.chains.map((chain) => [chain.id, http()])),
    });
    getChains() {
        return this.chains;
    }
    getWagmiConfig() {
        return this.config;
    }
    async readContract(parameters) {
        return await readContract(this.config, parameters);
    }
}
export default new KaiaRpcConnector();
//# sourceMappingURL=KaiaRpcConnector.js.map