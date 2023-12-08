import React, {useContext, useEffect, useState} from "react";
import {APITeamProps} from "../pages/GroupStagePage";
import GroupStageRowBuilder from "./GroupStageRowBuilder";
import {AppContext, AppContextProps} from "../App";
import {getTableTitle, processMaxId} from "../utils/utils";

type DroneTableProps = {
    teams: APITeamProps[],
    board: string,
    title?: string
}

const DroneTable = ({teams, board, title}: DroneTableProps) => {
    const [tableTeams, setTableTeams] = useState<APITeamProps[]>([])
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [isView, setIsView] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            const teamsTemp = teams.filter(team => team.board.includes(board));
            for (let i = 0; i < teamsTemp.length; i++) {
                for (let k = i; k < teamsTemp.length; k++) {
                    if (teamsTemp[i].score > teamsTemp[k].score) {
                        const tmp = teamsTemp[i];
                        teamsTemp[i] = teamsTemp[k];
                        teamsTemp[k] = tmp;
                    }
                }
            }
            console.log(teamsTemp);

            const filteredTeams = [];
            // Append none 0
            for (let i = 0; i < teamsTemp.length; i++) {
                if (teamsTemp[i].score !== 1) {
                    filteredTeams.push(teamsTemp[i]);
                }
            }

            // Append 0 item
            for (let i = 0; i < teamsTemp.length; i++) {
                if (teamsTemp[i].score === 1){
                    filteredTeams.push(teamsTemp[i]);
                }
            }
            setTableTeams(filteredTeams);
            await processMaxId(teamsTemp, (title === undefined) ? "" : title)
        }

        fetchTeams().then(r => console.log("R"));
    }, [teams])

    return <div className={"mt-7 w-full flex flex-col gap-7"}>
        <div className="  text-2xl font-bold rounded-3xl">
            <div className="bg-black text-center flex items-center justify-between px-16 pt-5 pb-5 rounded-t-3xl">
                <div className="invisible">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>
                    <label>Vòng 1 - {getTableTitle((title === undefined) ? "" : title)}</label>
                </div>
                <div onClick={() => {
                    setIsView(!isView);
                }}>
                    {isView ? <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div> : <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </div>}
                </div>
            </div>
            <div className={`bg-[#303030] w-full py-2 px-3 rounded-b-xl pt-2 border-[#171717] border-2 ${isView ? '' : 'hidden'}`}>
                <div className="flex justify-between items-center border-b-2 border-b-gray-400 pb-6">
                    <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-40' : 'text-xl w-20'}`}>
                        <label>Đội</label>
                    </div>
                    <div className={`flex ${windowSize.width > 700 ? 'gap-16' : 'gap-4'} mr-10`}>
                        <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-lg w-20'}`}>
                            <label>Thời gian</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-0 ">
                    {tableTeams.map((team, index) => {
                        if (team.board.includes(board)) {
                            return <GroupStageRowBuilder idx={index} team={team} key={index}/>
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default DroneTable;