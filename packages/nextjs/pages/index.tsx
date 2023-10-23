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
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, molestias!{" "}
                <Link href="/debug" passHref className="link">
                  Here Section 1 Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Lorem, ipsum dolor.{" "}
                <Link href="/example-ui" passHref className="link">
                  Lorem, ipsum.
                </Link>{" "}
                Lorem, ipsum dolor.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Lorem ipsum dolor sit amet consectetur.{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Lorem, ipsum dolor.
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
