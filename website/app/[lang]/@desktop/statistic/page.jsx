import "server-only";
import admin from "lib/database";
import Claimant from "./claimant";
import { translate } from "translate-config";
import LockTime from "./locktime";
import { Roboto_Mono } from "next/font/google";
import FutureUnlock from "./future";
import ToolTipMayLost from "./tooltip";
import AccountCreation from "./accountCreation";
import Circulation from "./circulation";
import ExplainPopOver from "components/ui/explain-pop";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
//export const revalidate = 1800;

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
  const now = new Date();
  let dataobj = data.data();
  //circulation
  let month_start = new Date(2022, 5, 5);
  let result_array = [];
  while (true) {
    if (
      month_start.getUTCFullYear() == now.getUTCFullYear() &&
      month_start.getUTCMonth() == now.getUTCMonth()
    ) {
      break;
    } else {
      result_array.push({ x: new Date(month_start) });
      month_start.setUTCMonth(month_start.getUTCMonth() + 1);
      month_start.setUTCDate(5);
    }
  }
  let a = 0,
    b = 0,
    c = 0,
    claimedMonth_copy = dataobj.claimedMonth.slice(),
    createclaimantMonth_copy = dataobj.createclaimantMonth.slice();

  result_array.map((data, i) => {
    if (
      claimedMonth_copy.length > 0 &&
      claimedMonth_copy[0].x.substring(0, 4) == data.x.getUTCFullYear() &&
      parseInt(claimedMonth_copy[0].x.substring(5)) == data.x.getUTCMonth() + 1
    ) {
      b += parseFloat(claimedMonth_copy[0].z);
      data.b = b;
      claimedMonth_copy.shift();
    } else {
      data.b = b;
    }

    if (
      createclaimantMonth_copy.length > 0 &&
      createclaimantMonth_copy[0].x.substring(0, 4) ==
        data.x.getUTCFullYear() &&
      parseInt(createclaimantMonth_copy[0].x.substring(5)) ==
        data.x.getUTCMonth() + 1
    ) {
      c += parseFloat(createclaimantMonth_copy[0].z);
      data.c = c - b;
      createclaimantMonth_copy.shift();
    } else {
      data.c = c - b;
    }
  });

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

  dataobj.accountCreation.map((data, i) => {
    data.x = new Date(data.x).getTime();
    if (i != 0) {
      data.y += dataobj.accountCreation[i - 1].y;
    }
  });

  dataobj.claimedback.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.createclaimant.map((data) => {
    data.x = new Date(data.x).getTime();
  });
  dataobj.futureUnlock.map((data) => {
    data.amount = parseFloat(data.amount);
    data.x = new Date(data.x).getTime();
  });
  dataobj.futureUnlockMonth.map((data) => {
    data.amount = parseFloat(data.amount);
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

        <div className={roboto_Mono.className + " w-full"}>
          <div className="text-center mb-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom">
            {transcript.statistic.Metrics.title}
          </div>
          <div className=" rounded-md overflow-hidden shadow-lg mb-4">
            <table className="w-full text-center table-auto">
              <tbody>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="All Account"
                      content="Include CT Account"
                    />
                  </td>
                  <td className=" py-2 font-medium">
                    {transcript.statistic.Metrics.TotalAccount}
                    <div className=" absolute top-0"></div>
                  </td>
                  <td className=" px-3 py-2">
                    {Number.parseInt(
                      dataobj.metric.TotalAccount
                    ).toLocaleString("en-US")}
                  </td>
                </tr>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="All Account"
                      content="Only Pioneers"
                    />
                  </td>
                  <td className=" py-2 font-medium">
                    {transcript.statistic.Metrics.TotalPioneer}
                  </td>
                  <td className=" px-3 py-2">{totalpioneer}</td>
                </tr>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="Migrated Pi"
                      content="Calculated by all amount of claimant by GABT"
                    />
                  </td>
                  <td className="  py-2 font-medium">
                    {transcript.statistic.Metrics.MigratedPi}
                  </td>
                  <td className=" px-3 py-2 text-xs">
                    {Number.parseFloat(dataobj.metric.TotalPi).toLocaleString(
                      "en-US",
                      { maximumFractionDigits: 7 }
                    )}{" "}
                    Pi
                  </td>
                </tr>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="Pioneer Hold"
                      content="All claimed Pi after unlock(only claimant from GABT)"
                    />
                  </td>
                  <td className="  py-2 font-medium">
                    {transcript.statistic.Metrics.PioneerHold}
                  </td>
                  <td className=" px-3 py-2 text-xs">
                    {Number.parseFloat(
                      dataobj.metric.TotalClaim
                    ).toLocaleString("en-US", {
                      maximumFractionDigits: 7,
                    })}{" "}
                    Pi
                  </td>
                </tr>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="UnLock"
                      content="All unclaimed Pi after unlock"
                    />
                  </td>
                  <td className="  py-2 font-medium">
                    {transcript.statistic.Metrics.PiLocked}
                  </td>
                  <td className=" px-3 py-2 text-xs">
                    {(
                      parseFloat(dataobj.metric.TotalLock) -
                      parseFloat(dataobj.unlocknotclaimed)
                    ).toLocaleString("en-US", {
                      maximumFractionDigits: 7,
                    })}{" "}
                    Pi
                  </td>
                </tr>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="UnLock"
                      content="All unclaimed Pi after unlock"
                    />
                  </td>
                  <td className="  py-2 font-medium">UnLock</td>
                  <td className=" px-3 py-2 text-xs">
                    {Number.parseFloat(dataobj.unlocknotclaimed).toLocaleString(
                      "en-US",
                      { maximumFractionDigits: 7 }
                    )}{" "}
                    Pi
                  </td>
                </tr>
                <tr className="border-b border-[#F7E4BE] bg-[#FBF2DE] text-neutral-800">
                  <td className="py-1">
                    <ExplainPopOver
                      title="Pioneer May Lose their Pi"
                      content="All unclaimed Pi after 1 year unlock"
                    />
                  </td>
                  <td className="justify-center items-center  py-2 font-medium inline-flex select-all">
                    MayLostPi
                  </td>
                  <td className=" px-3 py-2 text-xs">
                    {Number.parseFloat(dataobj.oneyearunclaimed).toLocaleString(
                      "en-US",
                      { maximumFractionDigits: 7 }
                    )}{" "}
                    Pi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full">
          <AccountCreation
            data={dataobj}
            transcript={transcript.statistic.Migrate}
          />
        </div>

        <div className="w-full">
          <Claimant data={dataobj} transcript={transcript.statistic.Migrate} />
        </div>

        <div className="w-full">
          <Circulation
            data={result_array}
            transcript={transcript.statistic.Migrate}
          />
        </div>

        <div className="w-full">
          <FutureUnlock
            data={dataobj}
            transcript={transcript.statistic.Migrate}
          />
        </div>
        <div className="w-full">
          <LockTime data={dataobj} transcript={transcript.statistic.LockUP} />
        </div>
      </div>
    </>
  );
}
