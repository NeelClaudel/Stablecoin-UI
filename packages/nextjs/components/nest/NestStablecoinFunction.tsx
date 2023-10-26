//import { Address } from "../scaffold-eth";
import { Address } from "../scaffold-eth";
import { ETHToPrice } from "./EthToPrice";
//import { Token } from "@uniswap/sdk-core";
//import humanizeDuration from "humanize-duration";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useAccountBalance, useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const NestStablecoinFunction = ({ address }: { address?: string }) => {
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
  /*
  const { data: isStakingCompleted } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "completed",
    watch: true,
  });

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

/*    <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
      {isStakingCompleted && (
        <div className="flex flex-col items-center gap-2 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-12 w-full max-w-lg">
          <p className="block m-0 font-semibold">
            {" "}
            🎉 &nbsp; Staking App triggered `ExampleExternalContract` &nbsp; 🎉{" "}
          </p>
          <div className="flex items-center">
            <ETHToPrice
              value={nestStableCoinContractBalance != null ? nestStableCoinContractBalance.toString() : undefined}
              className="text-[1rem]"
            />
            <p className="block m-0 text-lg -ml-1">staked !!</p>
          </div>
        </div>
      )}
      <div
        className={`flex flex-col items-center space-y-8 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full max-w-lg ${
          !isStakingCompleted ? "mt-24" : ""
        }`}
      >
        <div className="flex flex-col w-full items-center">
          <p className="block text-2xl mt-0 mb-2 font-semibold">NEST Contract</p>
          <Address address={address} size="xl" />
        </div>
        <div className="flex items-start justify-around w-full">
          <div className="flex flex-col items-center justify-center w-1/2">
            <p className="block text-xl mt-0 mb-1 font-semibold">Time Left</p>
            <p className="m-0 p-0">{timeLeft ? `${humanizeDuration(Number(timeLeft) * 1000)}` : 0}</p>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <p className="block text-xl mt-0 mb-1 font-semibold">You Staked</p>
            <span>
              {yourBalance ? formatEther(yourBalance) : 0} {configuredNetwork.nativeCurrency.symbol}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center shrink-0 w-full">
          <p className="block text-xl mt-0 mb-1 font-semibold">Total Staked</p>
          <div className="flex space-x-2">
            {
              <ETHToPrice
                value={nestEngineContractBalance != null ? nestEngineContractBalance.toString() : undefined}
              />
            }
            <span>/</span>
            {<ETHToPrice value={collateralPrice ? formatEther(BigInt(collateralPrice)) : undefined} />}
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-7">
            <button className="btn btn-primary" onClick={() => execute()}>
              Execute!
            </button>
            <button className="btn btn-primary" onClick={() => withdrawETH()}>
              Withdraw
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => stakeETH()}>
            🥩 Stake 0.5 ether!
          </button>
        </div>
      </div>
    </div>
    */
