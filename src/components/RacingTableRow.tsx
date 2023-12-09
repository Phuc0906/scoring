import React, {useContext, useEffect, useState} from "react";
import {AppContext, AppContextProps} from "../App";
import RacingTable from "./RacingTable";
import {brandArr} from "../utils/utils";

export type MicromouseTeamProps = {
    team_id: string,
    brand: number,
    team: string,
    round1: number,
    round2: number,
    board: string
}

type RacingTableRowProps = {
    team: MicromouseTeamProps;
}

const RacingTableRow = ({team}: RacingTableRowProps) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [finalScore, setFinalScore] = useState(1);

    useEffect(() => {
        if ((team.round1 !== 1) && (team.round2 !== 1)) {
            setFinalScore((team.round1 > team.round2) ? team.round2 : team.round1);
        }else if (team.round1 !== 1) {
            setFinalScore(team.round1);
        }else {
            setFinalScore(0);
        }
    }, [])

    return <div className="flex justify-between items-center mt-5 pb-6">
        <div className={`w-fit text-left flex items-center gap-3 ${windowSize.width > 700 ? 'text-2xl w-80' : 'text-xl w-44'}`}>
            <div className={`${windowSize.width > 700 ? 'w-[80px]' : 'w-[50px]'}`}>
                <img src={brandArr[team.brand - 1].logo}/>
            </div>
            <div className={`${(windowSize.width > 700) ? 'text-3xl w-[200px]' : 'text-sm w-[100px]'}`}>
                <label>{team.team}</label>
            </div>
        </div>
        <div className={`flex ${windowSize.width > 700 ? 'gap-16' : 'gap-0.5'} `}>
            <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-sm w-16'}`}>
                <label>{(team.round1 === 1) ? 0 : team.round1} s</label>
            </div>
            <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-sm w-16'}`}>
                <label>{(team.round2 === 1) ? 0 : team.round2} s</label>
            </div>
            <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-sm w-16'}`}>
                <label>{finalScore} s</label>
            </div>
        </div>
    </div>
}

export default RacingTableRow;
