import "server-only";
import { translate } from "translate-config";
import admin from "lib/database";
import BlockChainData from "./data";
import BlockStream from "./blockstream";
import banner from "public/banner.png";
import Image from "next/image";
import Banner from "./banner";
export const revalidate = 1800;

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

export default async function ExplorerPage({ params: { lang } }) {
  const transcript = await import(`locales/${lang}.json`);
  const db = admin.firestore();
  const data = await db.collection("statistic").doc("data").get();
  let dataobj = data.data();
  return (
    <>
      <Banner />
      <div className="p-5 pb-16 w-full h-full overflow-scroll">
        <div className="flex w-full h-auto flex-col">
          <BlockChainData data={dataobj} transcript={transcript.statistic} />
          <BlockStream time={transcript.time} lang={lang} />
        </div>
      </div>
    </>
  );
}
