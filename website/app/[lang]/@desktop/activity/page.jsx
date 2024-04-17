import 'server-only'
import admin from "lib/database";
import { translate } from "translate-config";
import Top10 from './top10';
import DailyTable from './daily';
import RankTable from './rank';
export const revalidate =  86400


export async function generateStaticParams() {
  return translate.locales.map(locale => ({lang:locale}));
}

export default async function StatisticPage({params:{lang}}){
    const transcript = await import(`locales/${lang}.json`);
    const db = admin.firestore();
    const data = await db.collection('statistic').doc('data').get()
    let dataobj = data.data()

    const update = new Date(dataobj.timestamp)
    return(
        <>
        
        <div className="mx-4 h-[calc(100vh_-_58px)] md:w-[calc(100vw_-_16rem)] md:px-10 mt-2 pb-10 overflow-y-scroll ">
            <h2 className="text-center underline decoration-indigo-500 decoration-2 underline-offset-2 font-bold text-orange-400">Latest Update at : UTC {update.toISOString().substr(0,16).replace('T',' ')}</h2>
            
            <DailyTable data={dataobj.daily}/>
            <Top10 data={dataobj} lang={lang} transcript={transcript.statistic.TOP10}/>
            <RankTable data={dataobj.rank}/>
        </div>        
        </>
    )
}