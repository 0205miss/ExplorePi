import NavbarMobile from "./component/navbar";
import Searchbar from "./component/searchbar";
import SideBar from "./component/sidebar";
import './style.css'

export default async function Layout({params: { lang },children}){
    return(<>
    <div className="purple-style w-screen h-screen overflow-hidden desktop-bg">
            <SideBar lang={lang}/>
                <NavbarMobile lang={lang}/>
            <div className="relative md:ml-64 h-screen">
                <Searchbar lang={lang}/>
                
                {children}                

            </div>
        </div>
    </>)

}