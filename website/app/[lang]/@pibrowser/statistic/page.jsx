import "server-only";
import admin from "lib/database";
import Block from "./block";
import Top10 from "./top10";
import Distribute from "./operation";
import Claimant from "./claimant";
import { translate } from "translate-config";
import LockTime from "./locktime";
import { Roboto_Mono } from "next/font/google";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import NetworkPage from "./network/page";
import DailyPage from "./daily/page";
import MigrationPage from "./migration/page";
export const revalidate = 3600;

const roboto_Mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

export default async function StatisticPage({ params: { lang } }) {
  const transcript = await import(`locales/${lang}.json`);
  const db = admin.firestore();
  const data = await db.collection("statistic").doc("data").get();
  let dataobj = data.data();
  const net_data = await db.collection("statistic").doc("network").get();
  let net_dataobj = net_data.data();
  const activedata = await db.collection('statistic').doc('active').get()
    let activedataobj = activedata.data()
  const update = new Date(dataobj.timestamp);
  return (
    <>
      <div className="mx-4 h-stream mt-2 overflow-y-scroll ">
        <h2 className="text-center underline decoration-indigo-500 decoration-2 underline-offset-2 font-bold text-orange-400">
          Latest Update at : UTC{" "}
          {update.toISOString().substr(0, 16).replace("T", " ")}
        </h2>

        <Tabs  defaultValue="daily">
          <TabsList className="w-full bg-slate-300 mt-2">
            <TabsTrigger
              className="data-[state=active]:bg-white"
              value="network"
            >
              Network
            </TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-white" value="daily">
              Daily
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-white"
              value="migration"
            >
              Migration
            </TabsTrigger>
          </TabsList>
          <TabsContent value="network">
            <div className="w-full">
              <NetworkPage dataobj={dataobj} net_dataobj={net_dataobj} transcript={transcript}/>
            </div>
          </TabsContent>
          <TabsContent value="daily">
            <DailyPage dataobj={dataobj} activedataobj={activedataobj} transcript={transcript} lang={lang}></DailyPage>
          </TabsContent>
          <TabsContent value="migration">
            <MigrationPage dataobj={dataobj}  transcript={transcript}/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
