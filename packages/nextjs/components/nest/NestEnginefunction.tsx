//import { Address } from "../scaffold-eth";
//import { ETHToPrice } from "./EthToPrice";
//import { Token } from "@uniswap/sdk-core";
//import humanizeDuration from "humanize-duration";
//import { formatEther } from "viem";
import { useAccount } from "wagmi";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

//import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const NestEngineFunction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: NESTEngineContract } = useDeployedContractInfo("NESTEngine");

  const { balance: WethBalance } = useAccountBalance("0xdd13E55209Fd76AfE204dBda4007C227904f0a81") ?? {};

  useAccountBalance(NESTEngineContract?.address);

  // const configuredNetwork = getTargetNetwork();

  // Contract Read Actions
  const { data: getPrecision } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getPrecision",
    watch: true,
  });

  const { data: getAdditionalFeedPrecision } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getAdditionalFeedPrecision",
    watch: true,
  });

  const { data: getLiquidationThreshold } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getLiquidationThreshold",
    watch: true,
  });

  const { data: getLiquidationBonus } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getLiquidationBonus",
    watch: true,
  });

  const { data: getLiquidationPrecision } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getLiquidationPrecision",
    watch: true,
  });

  const { data: getMinHealthFactor } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getMinHealthFactor",
    watch: true,
  });

  const { data: getHealthFactor } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getHealthFactor",
    args: [connectedAddress],
    watch: true,
  });
  getHealthFactor;

  // Contract Read Actions
  const { data: calculateHealthFactor } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "calculateHealthFactor",
    args: [undefined, undefined],
    watch: true,
  });

  const { data: getCollateralTokenPriceFeed } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getCollateralTokenPriceFeed",
    args: [address],
    watch: true,
  });

  const { data: getNest } = useScaffoldContractRead({
    contractName: "NESTEngine",
    functionName: "getNest",
    watch: true,
  });

  // Contract Write Actions
  const { writeAsync: depositCollateral } = useScaffoldContractWrite({
    contractName: "NESTEngine",
    functionName: "depositCollateral",
    args: [NESTEngineContract?.address, undefined] as const,
  });
  depositCollateral;

  const { writeAsync: depositCollateralAndMintNest } = useScaffoldContractWrite({
    contractName: "NESTEngine",
    functionName: "depositCollateralAndMintNest",
    args: [NESTEngineContract?.address, undefined, undefined] as const,
  });
  depositCollateralAndMintNest;

  return (
    <>
      <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center flex-col flex-grow pt-10">Your Connected Address {connectedAddress}</div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Collateral Price Feed {getCollateralTokenPriceFeed ? getCollateralTokenPriceFeed.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Collateral Price Feed {WethBalance ? WethBalance.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Minimum Health Factor {getMinHealthFactor ? getMinHealthFactor.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Calculate Health Factor {calculateHealthFactor ? calculateHealthFactor.toString() : ""}
          </div>{" "}
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Health Factor {getHealthFactor ? getHealthFactor.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">Get Nest {getNest ? getNest.toString() : ""}</div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Precision : {getPrecision ? getPrecision.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Liquidation Precision : {getLiquidationPrecision ? getLiquidationPrecision.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Additional Feed Precision : {getAdditionalFeedPrecision ? getAdditionalFeedPrecision.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Liquidation Bonus : {getLiquidationBonus ? getLiquidationBonus.toString() : ""}
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Liquidation Threshold : {getLiquidationThreshold ? getLiquidationThreshold.toString() : ""}
          </div>
        </div>
      </div>
    </>
  );
};
