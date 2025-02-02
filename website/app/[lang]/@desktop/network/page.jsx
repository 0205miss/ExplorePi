import "server-only";
import admin from "lib/database";
import Block from "./block";
import { translate } from "translate-config";
import { Roboto_Mono } from "next/font/google";
import Transaction from "./tx";
import TotalBlock from "./totalblock";
import TotalOperation from "./op";
import { unstable_cache } from "next/cache";
export const revalidate = 1800;

const roboto_Mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

const getdata = async () => {
  const db = admin.firestore();
  const data = await db.collection("statistic").doc("data").get();
  const dataobj = data.data();
  return { dataobj };
};

const getdataImp = unstable_cache(getdata, ["getdata"], {
  tags: ["getdata"],
  revalidate: 60 * 10,
});
const getnetdata = async () => {
  const db = admin.firestore();
  const data = await db.collection("statistic").doc("network").get();
  const dataobj = data.data();
  return { dataobj };
};
const getnetdataImp = unstable_cache(getnetdata, ["getnetdata"], {
  tags: ["getnetdata"],
  revalidate: 60 * 10,
});
export default async function StatisticPage({ params: { lang } }) {
  const transcript = await import(`locales/${lang}.json`);
  const data = await getdataImp();
  let dataobj = data.dataobj;
  const net_data = await getnetdataImp();
  let net_dataobj = net_data.dataobj
  /*block data*/
  dataobj.blocktime.map((data) => {
    if (data.y > 10) data.y = null;
    data.x = new Date(data.x).getTime();
  });
  dataobj.blocktimeMonth.map((data) => {
    if (data.y > 10) data.y = null;
    data.x = new Date(data.x).getTime();
  });
  dataobj.claimedMonth.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.claimedbackMonth.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.createclaimantMonth.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.claimed.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.claimedback.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.createclaimant.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  const update = new Date(dataobj.timestamp);
  const totalpioneer = Number.parseInt(
    dataobj.lockuptime[0].no_lock +
      dataobj.lockuptime[0].oneyear +
      dataobj.lockuptime[0].sixmonths +
      dataobj.lockuptime[0].threeyear +
      dataobj.lockuptime[0].twoweek
  ).toLocaleString("en-US");
  return (
    <>
      <div className="mx-4 h-[calc(100vh_-_58px)] md:w-[calc(100vw_-_16rem)] md:px-10 mt-2 pb-10 overflow-y-scroll ">
        <h2 className="text-center underline decoration-indigo-500 decoration-2 underline-offset-2 font-bold text-orange-400">
          Latest Update at : UTC{" "}
          {update.toISOString().substr(0, 16).replace("T", " ")}
        </h2>

        <div className="w-full">
          <Block data={dataobj} transcript={transcript.statistic.Block} />
          <TotalBlock
            data={net_dataobj}
            transcript={transcript.statistic.Block}
          />
          <TotalOperation
            data={net_dataobj}
            transcript={transcript.statistic.Block}
          />
          <Transaction
            data={net_dataobj}
            transcript={transcript.statistic.Block}
          />
        </div>
      </div>
    </>
  );
}
