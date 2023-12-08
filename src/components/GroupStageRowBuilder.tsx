import React, {useContext} from "react";
import {GroupPageRowProps} from "../pages/GroupStagePage";
import {AppContext, AppContextProps} from "../App";
import {brandArr} from "../utils/utils";


const GroupStageRowBuilder: React.FC<GroupPageRowProps> = ({team, idx}) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;

    return <div className={`flex py-6 px-2 justify-between items-center `}>
        <div className={`flex items-center gap-4 w-fit text-center ${windowSize.width > 700 ? 'text-2xl' : 'text-xl'}`}>
            <div className={`${windowSize.width > 700 ? 'w-16' : 'w-12'}`}>
                <img src={brandArr[team.brand - 1].logo}/>
            </div>
            <div>
                <label>{team.team}</label>
            </div>
        </div>
        <div className={`flex  ${windowSize.width > 700 ? 'gap-16 ' : 'gap-4'}`}>
            <div className={` text-center   ${windowSize.width > 700 ? 'text-2xl w-32' : 'text-xl w-52'}`}>
                <label>{team.score === 1 ? 0 : team.score} s</label>
            </div>
        </div>
    </div>
}

export default GroupStageRowBuilder;
