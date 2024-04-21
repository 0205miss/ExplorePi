import "server-only";
import { translate } from "translate-config";
import admin from "lib/database";
import BlockChainData from "./data";
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
      <div className="p-5 pb-10 w-full h-full overflow-hidden">
        <div className="flex w-full h-full flex-col">
          <BlockChainData data={dataobj} transcript={transcript.statistic} />
        </div>
      </div>
    </>
  );
}
