import React, {useContext} from "react";
import finalLogo from "../assests/Logo2.png";
import {AppContext, AppContextProps} from "../App";
import KnockOutMatch from "./KnockOutMatch";
import '../css/knowoutmap.css'

type KnockOutMapProps = {
    matchCategory: string
}

const KnockOutMap = ({matchCategory}: KnockOutMapProps) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;

    return <div className={`w-full ${windowSize.width < 1400 ? '' : 'flex justify-center'} h-fit  text-white text-xl flex overflow-scroll`} style={{
        overflowY: 'hidden',


    }}>
        {/*Quarter left*/}
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label>Vòng tứ kết</label>
            </div>
            <div className="mt-10 relative flex flex-row items-center justify-center w-[250px] h-[440px] border-t-2 border-r-2 border-b-2 border-orange-400 pr-5">
                <KnockOutMatch pos={`-top-10`} title={``} detectMatch={`${matchCategory}_quarter_1`}/>
                <div className="w-28">
                    <img src={finalLogo} />
                </div>
                <KnockOutMatch pos={`-bottom-10`} title={``} detectMatch={`${matchCategory}_quarter_2`}/>
            </div>

        </div>
        {/*Semi left*/}
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label>Bán kết</label>
            </div>
            <div className="w-[270px] h-[490px] flex flex-col justify-center ">
                <div className="pl-8 relative flex flex-row items-center justify-center h-[2px] my-auto bg-orange-500">
                    <KnockOutMatch pos={`-top-12`} title={``} detectMatch={`${matchCategory}_semi_1`}/>
                </div>
            </div>
        </div>
        {/*Line of semi and final*/}
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label className="invisible">test</label>
            </div>
            <div className={`w-[35px] h-[490px] flex flex-col justify-center`}>
                <div className="relative h-[2px] bg-orange-500">
                </div>
            </div>
        </div>
        {/*Final*/}
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label>Chung kết</label>
            </div>
            <div className="w-[285px] h-[690px] pt-[130px] ">
                <div className="relative flex flex-col items-center justify-center h-[240px]  my-auto border-2 border-orange-500">
                    <KnockOutMatch pos={`-top-12`} title={`Chung kết`} detectMatch={`${matchCategory}_final`}/>
                    <div className="w-28">
                        <img src={finalLogo} />
                    </div>
                    <KnockOutMatch pos={`-bottom-12`} title={`Tranh hạng ba`} detectMatch={`${matchCategory}_third`}/>
                </div>
            </div>
        </div>
        {/*Line of final and right semi*/}
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label className="invisible">test</label>
            </div>
            <div className={`w-[37px] h-[490px] flex flex-col justify-center`}>
                <div className="relative h-[2px] bg-orange-500">
                </div>
            </div>
        </div>
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label>Bán kết</label>
            </div>
            <div className="w-[270px] h-[490px] flex flex-col justify-center ">
                <div className="pr-8 relative flex flex-row items-center justify-center h-[2px] my-auto bg-orange-500">
                    <KnockOutMatch pos={`-top-12`} title={``} detectMatch={`${matchCategory}_semi_2`}/>
                </div>
            </div>
        </div>
        {/*Quarter left*/}
        <div className=" flex w-fit text-center flex-col gap-7 mt-10">
            <div>
                <label>Vòng tứ kết</label>
            </div>
            <div className="mt-10 relative flex flex-row items-center justify-center w-[250px] h-[440px] border-t-2 border-l-2 border-b-2 border-orange-400 pl-5">
                <KnockOutMatch pos={`-top-10`} title={``} detectMatch={`${matchCategory}_quarter_3`}/>
                <div className="w-28">
                    <img src={finalLogo} />
                </div>
                <KnockOutMatch pos={`-bottom-10`} title={``} detectMatch={`${matchCategory}_quarter_4`}/>
            </div>
        </div>

    </div>
}

export default KnockOutMap;
