import React, {useContext, useEffect, useRef, useState} from "react";
import TBD_LOGO from '../assests/TBD_LOGO.png'
import {brandArr} from "../utils/utils";
import KnockOutMap from "../components/KnockOutMap";


export interface APITeamProps {
    board: string,
    brand: number
    draw: number,
    lose: number,
    score: number
    team: string
    team_id: string
    win: number
}

export interface GroupPageRowProps {
    team: APITeamProps,
    idx: number
}


const GroupStageRowBuilder: React.FC<GroupPageRowProps> = ({team, idx}) => {
    const windowSize = {
        width: 300
    }

    return <div className={`flex py-6 px-2 justify-between items-center mr-10`}>
        <div className={`flex items-center gap-4 w-fit text-center ${windowSize.width > 700 ? 'text-2xl' : 'text-lg'}`}>
            <div className={`${windowSize.width > 700 ? 'w-16' : 'w-8'}`}>
                <img src={(team.team.length === 0) ? TBD_LOGO : brandArr[team.brand - 1].logo} />
            </div>
            <div>
                <label>{team.team}</label>
            </div>
        </div>
        <div className={`flex  ${windowSize.width > 700 ? 'gap-16 ' : 'gap-4'}`}>
            <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{team.win - 1}</label>
            </div>
            <div className={` text-center   ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{team.draw - 1}</label>
            </div >
            <div className={` text-center   ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{team.lose - 1}</label>
            </div>
            <div className={` text-center   ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{(team.win - 1)*3 + (team.draw - 1)}</label>
            </div>
        </div>
    </div>
}



const GroupStagePage = () => {


    return <div>
        <div>
            <div className="w-full text-center text-4xl text-white mb-16 mt-10">
                <label>VÒNG LOẠI TRỰC TIẾP SUMO ĐẠI HỌC</label>
            </div>
            <KnockOutMap matchCategory={"SUMO_UNI"}/>
        </div>
        <div>
            <div className="w-full text-center text-4xl text-white mb-16 mt-10">
                <label>VÒNG LOẠI TRỰC TIẾP SUMO PHỔ THÔNG</label>
            </div>
            <KnockOutMap matchCategory={"SUMO_REGULAR"}/>
        </div>
    </div>
}

export default GroupStagePage;
