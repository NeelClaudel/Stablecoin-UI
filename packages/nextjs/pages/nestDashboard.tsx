import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { NestStablecoinFunction } from "~~/components/nest";
import { NestEngineFunction } from "~~/components/nest/NestEnginefunction";

const NestDashboard: NextPage = () => {
  return (
    <>
      {" "}
      <MetaHeader
        title="$NEST Manager | Nest Stablecoin"
        description="Manage your $NEST Vault and your $NEST Stablecoin"
      />
      <NestStablecoinFunction />
      <NestEngineFunction />
    </>
  );
};

export default NestDashboard;
