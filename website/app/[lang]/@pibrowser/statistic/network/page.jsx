import "server-only";
import Block from "./block";
import { translate } from "translate-config";
import { Roboto_Mono } from "next/font/google";
import Transaction from "./tx";
import TotalBlock from "./totalblock";
import TotalOperation from "./op";
export const revalidate = 1800;

const roboto_Mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

export default async function NetworkPage({ dataobj,net_dataobj,transcript }) {
  return (
    <>
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
    </>
  );
}
