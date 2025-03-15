export default async function StatisticLayout({children,params: { lang }}){
    const transcript = await import(`locales/${lang}.json`);
    
    return(
        <>
        <div className="w-full h-[calc(100%-64px)] md:h-full md:pb-[58px] overflow-scroll bg-white">
            {children}
        </div>
        </>
    )
}