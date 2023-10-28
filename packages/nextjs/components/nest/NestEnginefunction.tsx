//import { Address } from "../scaffold-eth";
//import { ETHToPrice } from "./EthToPrice";
//import { Token } from "@uniswap/sdk-core";
//import humanizeDuration from "humanize-duration";
import { useState } from "react";
//import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { IntegerInput } from "~~/components/scaffold-eth";
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

  const { balance: WethBalance } = useAccountBalance() ?? {};

  const [txValue, setTxValue] = useState<string | bigint>("");

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
    value: BigInt(txValue),
    blockConfirmations: 1,
    onBlockConfirmation: txnRecipt => {
      console.log("Transaction Blockhash", txnRecipt.blockHash);
    },
  });
  depositCollateralAndMintNest;

  return (
    <>
      <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center flex-col flex-grow pt-10">
            Your Connected Address <span>{connectedAddress}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Collateral Price Feed{" "}
            <span>{getCollateralTokenPriceFeed ? getCollateralTokenPriceFeed.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Your WETH Balance <span>{WethBalance ? WethBalance.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Minimum Health Factor <span>{getMinHealthFactor ? getMinHealthFactor.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Calculate Health Factor <span>{calculateHealthFactor ? calculateHealthFactor.toString() : ""}</span>
          </div>{" "}
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Health Factor <span>{getHealthFactor ? getHealthFactor.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Nest <span>{getNest ? getNest.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Precision : <span>{getPrecision ? getPrecision.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Liquidation Precision : <span>{getLiquidationPrecision ? getLiquidationPrecision.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Additional Feed Precision :{" "}
            <span>{getAdditionalFeedPrecision ? getAdditionalFeedPrecision.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Liquidation Bonus : <span>{getLiquidationBonus ? getLiquidationBonus.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Get Liquidation Threshold : <span>{getLiquidationThreshold ? getLiquidationThreshold.toString() : ""}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                depositCollateral();
              }}
            >
              Deposit Collateral
            </button>
            <button className="btn btn-error" onClick={() => depositCollateralAndMintNest()}>
              Deposit Collateral And Mint Nest
            </button>
          </div>
          <IntegerInput
            value={txValue}
            onChange={updatedTxValue => {
              setTxValue(updatedTxValue);
            }}
            placeholder="value (wei)"
            name="value"
          />
          ;
        </div>
      </div>
    </>
  );
};
