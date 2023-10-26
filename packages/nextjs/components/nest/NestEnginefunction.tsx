import { Address } from "../scaffold-eth";
import { ETHToPrice } from "./EthToPrice";
//import { Token } from "@uniswap/sdk-core";
//import humanizeDuration from "humanize-duration";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useAccountBalance, useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const NestEngineFunction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: NESTEngineContract } = useDeployedContractInfo("NESTEngine");
  const { data: NestStableCoinContact } = useDeployedContractInfo("NestStableCoin");
  const { balance: nestEngineContractBalance } = useAccountBalance(NESTEngineContract?.address);
  const { balance: nestStableCoinContractBalance } = useAccountBalance(NestStableCoinContact?.address);

  const configuredNetwork = getTargetNetwork();

  // Contract Read Actions
  const { data: collateralPrice } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getCollateralTokenPriceFeed",
    args: [address],
    watch: true,
  });

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

  return (
    <>
      <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center flex-col flex-grow pt-10">
            Welcome <Address address={connectedAddress} />
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Your $NEST Balance In ETH :{" "}
            <span>
              {yourBalance ? formatEther(yourBalance) : 0} {configuredNetwork.nativeCurrency.symbol}
            </span>
          </div>
        </div>
        <div className="flex items-center flex-col flex-grow pt-10">
          ${symbol} Total Supply : <span>{nestTotalSupply ? formatEther(nestTotalSupply) : 0}</span>
        </div>
      </div>
      <div className="flex flex-col items-center shrink-0 w-full">
        <p className="block text-xl mt-0 mb-1 font-semibold">Total Staked</p>
        <div className="flex space-x-2">
          {<ETHToPrice value={nestEngineContractBalance != null ? nestEngineContractBalance.toString() : undefined} />}
          <span>/</span>
          {<ETHToPrice value={collateralPrice ? formatEther(BigInt(collateralPrice)) : undefined} />}
        </div>
      </div>
      <div className="flex flex-col items-center shrink-0 w-full">
        <p className="block text-xl mt-0 mb-1 font-semibold">Total Staked</p>
        <div className="flex space-x-2">
          {<ETHToPrice value={nestEngineContractBalance != null ? nestEngineContractBalance.toString() : undefined} />}
          <span>/</span>
          {<ETHToPrice value={collateralPrice ? formatEther(BigInt(collateralPrice)) : undefined} />}
        </div>
      </div>
      <div className="flex items-center">
        <ETHToPrice
          value={nestStableCoinContractBalance != null ? nestStableCoinContractBalance.toString() : undefined}
          className="text-[1rem]"
        />
        <p className="block m-0 text-lg -ml-1">staked !!</p>
      </div>
    </>
  );
};
