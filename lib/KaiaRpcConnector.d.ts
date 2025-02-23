import { Config, ReadContractParameters } from "@wagmi/core";
import { Chain as WagmiChain } from "@wagmi/core/chains";
import { type Abi, type ContractFunctionArgs, type ContractFunctionName } from "viem";
interface Chain extends WagmiChain {
    faucetUrl?: string;
}
declare class KaiaRpcConnector {
    private chains;
    private config;
    getChains(): [Chain, ...Chain[]];
    getWagmiConfig(): Config<[Chain, ...Chain[]], {
        [k: string]: import("viem").HttpTransport;
    }, readonly import("@wagmi/core").CreateConnectorFn[]>;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
}
declare const _default: KaiaRpcConnector;
export default _default;
//# sourceMappingURL=KaiaRpcConnector.d.ts.map