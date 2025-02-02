import "server-only";
import admin from "lib/database";
import { translate } from "translate-config";
import Top10 from "./top10";
import DailyTable from "./daily";
import RankTable from "./rank";
import TotalActive from "./active";
import OnChainLockUP from "./claimant";
import { unstable_cache } from "next/cache";
export const revalidate = 1800;

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

const getdata = async () => {
  const db = admin.firestore();
  const data = await db.collection("statistic").doc("data").get();
  const dataobj = data.data()
  return { dataobj };
};

const getdataImp = unstable_cache(getdata, ["getdata"], {
  tags: ["getdata"],
  revalidate: 60 * 10,
});
const getactivedata = async () => {
  const db = admin.firestore();
  const data = await db.collection("statistic").doc("active").get();
  const dataobj = data.data()
  return { dataobj };
};
const getactivedataImp = unstable_cache(getactivedata, ["getactivedata"], {
    tags: ["getactivedata"],
    revalidate: 60 * 10,
  });
export default async function StatisticPage({ params: { lang } }) {
  const transcript = await import(`locales/${lang}.json`);
  const data = await getdataImp();
  let dataobj = data.dataobj;
  const activedata = await getactivedataImp();
  let activedataobj = activedata.dataobj;
  const update = new Date(dataobj.timestamp);
  return (
    <>
      <div className="mx-4 h-[calc(100vh_-_58px)] md:w-[calc(100vw_-_16rem)] md:px-10 mt-2 pb-10 overflow-y-scroll ">
        <h2 className="text-center underline decoration-indigo-500 decoration-2 underline-offset-2 font-bold text-orange-400">
          Latest Update at : UTC{" "}
          {update.toISOString().substr(0, 16).replace("T", " ")}
        </h2>

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
        <OnChainLockUP
          data={dataobj}
          transcript={transcript.statistic.Migrate}
        />
      </div>
    </>
  );
}
