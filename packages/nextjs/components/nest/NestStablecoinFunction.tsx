//import { Address } from "../scaffold-eth";
import { Address } from "../scaffold-eth";
//import { Token } from "@uniswap/sdk-core";
//import humanizeDuration from "humanize-duration";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Balance } from "~~/components/scaffold-eth";
import { useAccountBalance, useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const NestStablecoinFunction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: NESTEngineContract } = useDeployedContractInfo("NESTEngine");
  const { data: NestStableCoinContact } = useDeployedContractInfo("NestStableCoin");
  useAccountBalance(NESTEngineContract?.address);
  useAccountBalance(NestStableCoinContact?.address);

  const configuredNetwork = getTargetNetwork();

  // Contract Read Actions
  const {} = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getCollateralTokenPriceFeed",
    args: [address],
    watch: true,
  });
  /*
  const { data: accountInformation } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getAccountInformation",
    args: [address],
  });
  */

  const { data: yourBalance } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });
  const { data: symbol } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "symbol",
    watch: true,
  });
  const { data: nestTotalSupply } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "totalSupply",
    watch: true,
  });

  const { data: contractName } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "name",
    watch: true,
  });
  /*
  // Contract Write Actions
  const { writeAsync: stakeETH } = useScaffoldContractWrite({
    contractName: "NESTEngine",
    functionName: "stake",
    value: "0.5",
  });
  const { writeAsync: execute } = useScaffoldContractWrite({
    contractName: "NESTEngine",
    functionName: "execute",
  });
  const { writeAsync: withdrawETH } = useScaffoldContractWrite({
    contractName: "NESTEngine",
    functionName: "withdraw",
  });
*/
  return (
    <>
      {/* User Infos */}
      <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center flex-col flex-grow pt-10">
            Welcome to your {contractName} ${symbol} Dashboard <Address address={connectedAddress} />
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Your $NEST Balance In ETH :{" "}
            <span>
              {yourBalance ? formatEther(yourBalance) : 0} {configuredNetwork.nativeCurrency.symbol}
            </span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Your $ETH/$USD Balance, click to switch :{" "}
            <span>
              <Balance address={connectedAddress} />
            </span>
          </div>
        </div>
      </div>
      <br />
      {/* Token Infos */}
      <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center flex-col flex-grow pt-10">
            ${symbol} Total Supply : <span>{nestTotalSupply ? formatEther(nestTotalSupply) : 0}</span>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
