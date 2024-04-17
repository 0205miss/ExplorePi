export default async function ExplorerLayout({children,params: { lang }}){
    const transcript = await import(`locales/${lang}.json`);
    return(
        <>      
            <div className='w-full h-full overflow-hidden bg-white'>
            <div className=' h-screen overflow-y-hidden overflow-x-hidden'> 
                {children}
            </div>
        </div>
        </>
    )
}