export default async function ExplorerLayout({children,params: { lang }}){
    
    return(
        <>
        <div className="w-full h-full md:pb-[58px] overflow-hidden bg-white">
            {children}
        </div>
            

        </>
    )
}