import Dashboard from "./dashboard";
import Share from "./share";
import Transaction from "./tx";
export default async function BlockPage({params:{lang,block}}){
    
    const transcript = await import(`locales/${lang}.json`);
    return(
        <>
        <section className=" m-4 overflow-y-scroll h-full pb-28">
            <section className="my-2">
                <div className="text-center text-2xl font-mono font-semibold border-b mx-4">
                    {transcript.explorer.block.Block} {block}
                    <Share block={block} lang={lang}/>
                </div>
                
                <div className="text-center pb-2 text-purple-500 text-lg my-2 border-b mx-4" >
                    <Dashboard lang={lang} block={block} transcript={transcript.explorer.block}/>                 
                </div>
            </section>

            <section>
                <div className="text-center mb-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom">
                {transcript.explorer.block.Transaction}
                </div>
                <Transaction lang={lang} block={block} transcript={transcript.explorer.transaction}/>
            </section>
        </section>
        </>
    )
}