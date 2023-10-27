//import { Address } from "../scaffold-eth";
import { Address } from "../scaffold-eth";
//import { Token } from "@uniswap/sdk-core";
//import humanizeDuration from "humanize-duration";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NestStablecoinFunction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: NESTEngineContract } = useDeployedContractInfo("NESTEngine");
  const { data: NestStableCoinContact } = useDeployedContractInfo("NestStableCoin");
  useAccountBalance(NESTEngineContract?.address);
  useAccountBalance(NestStableCoinContact?.address);

  const configuredNetwork = getTargetNetwork();

  // Contract Read Actions
  const { data: decimals } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "decimals",
    watch: true,
  });

  const { data: owner } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "owner",
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

  const { data: contractName } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "name",
    watch: true,
  });

  const { data: allowance } = useScaffoldContractRead({
    contractName: "NestStableCoin",
    functionName: "allowance",
    args: [connectedAddress, NestStableCoinContact?.address],
    watch: true,
  });

  // Contract Write Actions
  const { writeAsync: approve } = useScaffoldContractWrite({
    contractName: "NestStableCoin",
    functionName: "approve",
    args: [NestStableCoinContact?.address, nestTotalSupply],
  });
  approve; // This line is added to fix the warning message

  const { writeAsync: burn } = useScaffoldContractWrite({
    contractName: "NestStableCoin",
    functionName: "burn",
    args: [nestTotalSupply],
  });
  burn;

  const { writeAsync: decreaseAllowance } = useScaffoldContractWrite({
    contractName: "NestStableCoin",
    functionName: "decreaseAllowance",
    args: [NestStableCoinContact?.address, nestTotalSupply],
  });
  decreaseAllowance;

  const { writeAsync: burnFrom } = useScaffoldContractWrite({
    contractName: "NestStableCoin",
    functionName: "burnFrom",
    args: [NestStableCoinContact?.address || undefined, nestTotalSupply ? BigInt(nestTotalSupply) : undefined],
  });
  burnFrom;

  const { writeAsync: mint } = useScaffoldContractWrite({
    contractName: "NestStableCoin",
    functionName: "mint",
    args: [NestStableCoinContact?.address || undefined, nestTotalSupply ? BigInt(nestTotalSupply) : undefined],
  });
  mint;

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
            ${symbol} Total Supply : <span>{nestTotalSupply ? formatEther(nestTotalSupply).toString() : "0"}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            {" "}
            Decimals<span>{decimals}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Owner of the contract <span>{owner}</span>
          </div>
          <div className="flex items-center flex-col flex-grow pt-10">
            Allowance <span>{allowance ? allowance.toString() : "0"}</span>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
