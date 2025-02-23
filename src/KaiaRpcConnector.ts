import {
  Config,
  createConfig,
  http,
  readContract,
  ReadContractParameters,
} from "@wagmi/core";
import { Chain as WagmiChain, kaia, kairos } from "@wagmi/core/chains";
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from "viem";

interface Chain extends WagmiChain {
  faucetUrl?: string;
}

class KaiaRpcConnector {
  private chains: [Chain, ...Chain[]] = [kaia, {
    ...kairos,
    faucetUrl: "https://www.kaia.io/faucet",
  }];

  private config = createConfig({
    chains: this.chains,
    transports: Object.fromEntries(
      this.chains.map((chain) => [chain.id, http()]),
    ),
  });

  public getChains() {
    return this.chains;
  }

  public getWagmiConfig() {
    return this.config;
  }

  public async readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(parameters: ReadContractParameters<abi, functionName, args, Config>) {
    return await readContract(this.config, parameters);
  }
}

export default new KaiaRpcConnector();
