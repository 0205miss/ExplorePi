import "server-only";

import { translate } from "translate-config";
import Top10 from "./top10";
import DailyTable from "./daily";
import RankTable from "./rank";
import TotalActive from "./active";
import OnChainLockUP from "./claimant";

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

export default async function DailyPage({
  dataobj,
  activedataobj,
  transcript,
  lang
}) {
  return (
    <>
      <DailyTable data={dataobj.daily} />
      <Top10
        data={dataobj}
        lang={lang}
        transcript={transcript.statistic.TOP10}
      />
      <RankTable data={dataobj.rank} />
      <TotalActive
        data={activedataobj}
        transcript={transcript.statistic.Block}
      />
      <OnChainLockUP data={dataobj} transcript={transcript.statistic.Migrate} />
    </>
  );
}
