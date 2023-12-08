import React, {useContext} from "react";
import {AppContext, AppContextProps} from "../App";
import {GroupPageRowProps} from "./GroupStagePage";
import RacingTable from "../components/RacingTable";
import SumoBoard from "../components/SumoBoard";

export interface GroupStageProps {
    name: string,
    logo: string,
    win: number,
    draw: number,
    lose: number
}

export interface GroupStageRowBuilderProps {
    team: GroupPageRowProps,
    idx: number
}

const HomePage = () => {
    const {windowSize} = useContext(AppContext) as AppContextProps;

    return <div className="mt-5">
        {/*<div className={`text-white mt-10   ${windowSize.width > 700 ? 'mx-10 py-5 px-7 bg-[#222222]' : 'text-center mx-4'} rounded-3xl`}>*/}
        {/*    <div className="font-bold text-4xl">*/}
        {/*        <label>DRONE</label>*/}
        {/*    </div>*/}
        {/*    <RacingTable category={"DRONE"} title={"DRONE TABLE"}/>*/}
        {/*    <RacingTable category={"DRONE_REGULAR"} title={"DRONE REGULAR TABLE"}/>*/}
        {/*</div>*/}
        {/*<div className={`text-white mt-10   ${windowSize.width > 700 ? 'mx-10 py-5 px-7 bg-[#222222]' : 'text-center mx-4'} rounded-3xl`}>*/}
        {/*    <div className="font-bold text-4xl">*/}
        {/*        <label>Racing</label>*/}
        {/*    </div>*/}
        {/*    <RacingTable category={"RACING"} title={"RACING TABLE"}/>*/}
        {/*</div>*/}
        <SumoBoard/>
    </div>
}

export default HomePage;
