import { Config, ReadContractParameters } from "@wagmi/core";
import { type Abi, type ContractFunctionArgs, type ContractFunctionName } from "viem";
declare class KaiaRpcConnector {
    private chains;
    private config;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
}
declare const _default: KaiaRpcConnector;
export default _default;
//# sourceMappingURL=KaiaRpcConnector.d.ts.map