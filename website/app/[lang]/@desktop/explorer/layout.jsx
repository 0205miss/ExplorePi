export default async function ExplorerLayout({children,params: { lang }}){
    
    return(
        <>
        <div className="w-full h-[calc(100%-64px)] md:h-full md:pb-[58px] overflow-scroll bg-white">
            {children}
        </div>
            

        </>
    )
}