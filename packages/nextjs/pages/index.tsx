import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Nest Stablecoin</span>
          </h1>
          <p className="text-center text-lg">
            Get started by connecting{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              your wallet and Lend ETH and BTC and mint the stablecoin you need
            </code>
          </p>
          <p className="text-center text-lg">
            Enjoy High and stable earning by borrowing and stack in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              Your Personnalized Vault
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              with high yield
            </code>
          </p>
          <p className="text-center text-lg">
            In today ever-evolving financial landscape, stablecoins have emerged as a beacon of stability, offering a
            <br />
            harmonious blend of the conventional monetary world and the new age of decentralized finance. Enter Nest, a
            <br />
            cutting-edge decentralized application tailored for all your stablecoin needs. Nest is not just another
            <br />
            DApp; itis a sanctuary for stablecoin enthusiasts, traders, and users who prioritize stability and security
            <br />
            in a volatile crypto market.
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/debug" passHref className="link">
                  Diverse Range of Stablecoins:
                  <br />
                </Link>{" "}
                Whether you are looking to transact with the NUSD, the stable representation of the US dollar, or the
                NJPY, mirroring the value of the Japanese yen, Nest offers a comprehensive suite of stablecoins,
                ensuring that you are never limited by choice.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/example-ui" passHref className="link">
                  Seamless Trade:
                  <br />
                </Link>{" "}
                At the heart of Nest is a user-friendly interface that facilitates smooth trading experiences. Whether
                you are a seasoned trader or just getting started, Nest makes stablecoin exchanges seamless and
                hassle-free.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/blockexplorer" passHref className="link">
                  Global Reach, Local Feel:
                  <br />
                </Link>{" "}
                Global Reach, Local Feel: While Nest caters to a global audience, we recognize the importance of local
                currencies. Our variety of stablecoins ensures that you can transact and trade in a currency that feels
                closest to home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
