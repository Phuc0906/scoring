import React, {useContext, useEffect, useState} from "react";
import {getTableTitle} from "../utils/utils";
import GroupStageRowBuilder from "./GroupStageRowBuilder";
import {AppContext, AppContextProps} from "../App";
import RacingTableRow, {MicromouseTeamProps} from "./RacingTableRow";
import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import {getRacingTeams} from "../graphql/query/TeamCRUD";
import {racingTeamsChangeDetection, teamChangeDetection} from "../graphql/subcriptions/TeamSubcription";

type RacingTableProps = {
    category: string,
    title: string
}

const RacingTable = ({category, title}: RacingTableProps) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [isView, setIsView] = useState(false);
    const [racingTeams, setRacingTeams] = useState<MicromouseTeamProps[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const racingResponse = await API.graphql(graphqlOperation(getRacingTeams(category))) as GraphQLResult<any>;
            // setRacingTeams(racingResponse.data?.listRacingTeams.items);
            const teamsTemp: MicromouseTeamProps[] = racingResponse.data?.listRacingTeams.items;
            for (let i = 0; i < teamsTemp.length; i++) {
                for (let k = i; k < teamsTemp.length; k++) {
                    let finalScore1 = 0;
                    if ((teamsTemp[i].round1 !== 1) && (teamsTemp[i].round2 !== 1)) {
                        finalScore1 = (teamsTemp[i].round1 > teamsTemp[i].round2) ? teamsTemp[i].round2 : teamsTemp[i].round1;
                    }else if (teamsTemp[i].round1 !== 1) {
                        finalScore1 = (teamsTemp[i].round1);
                    }

                    let finalScore2 = 0;
                    if ((teamsTemp[k].round1 !== 1) && (teamsTemp[k].round2 !== 1)) {
                        finalScore2 = (teamsTemp[k].round1 > teamsTemp[k].round2) ? teamsTemp[k].round2 : teamsTemp[k].round1;
                    }else if (teamsTemp[k].round1 !== 1) {
                        finalScore2 = (teamsTemp[k].round1);
                    }

                    if (finalScore1 > finalScore2) {
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
                let finalScore1 = 0;
                if ((teamsTemp[i].round1 !== 1) && (teamsTemp[i].round2 !== 1)) {
                    finalScore1 = (teamsTemp[i].round1 > teamsTemp[i].round2) ? teamsTemp[i].round2 : teamsTemp[i].round1;
                }else if (teamsTemp[i].round1 !== 1) {
                    finalScore1 = (teamsTemp[i].round1);
                }
                if (finalScore1 !== 0) {
                    filteredTeams.push(teamsTemp[i]);
                }
            }

            // Append 0 item
            for (let i = 0; i < teamsTemp.length; i++) {
                let finalScore1 = 0;
                if ((teamsTemp[i].round1 !== 1) && (teamsTemp[i].round2 !== 1)) {
                    finalScore1 = (teamsTemp[i].round1 > teamsTemp[i].round2) ? teamsTemp[i].round2 : teamsTemp[i].round1;
                }else if (teamsTemp[i].round1 !== 1) {
                    finalScore1 = (teamsTemp[i].round1);
                }
                if (finalScore1 === 0){
                    filteredTeams.push(teamsTemp[i]);
                }
            }
            console.log(filteredTeams);
            setRacingTeams(filteredTeams);
        }
        fetchTeams().then(r => console.log(r));

        (API.graphql(graphqlOperation(racingTeamsChangeDetection)) as any).subscribe((eventData: any) =>
        {
            setRacingTeams([]);
            fetchTeams().then(r => console.log(r));
        });


    }, [])

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
                    <label>{title} </label>
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
                        <label>Team</label>
                    </div>
                    <div className={`flex ${windowSize.width > 700 ? 'gap-16' : 'gap-4'} mr-10`}>
                        <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-lg w-20'}`}>
                            <label>Round 1</label>
                        </div>
                        <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-lg w-20'}`}>
                            <label>Round 2</label>
                        </div>
                        <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-28' : 'text-lg w-20'}`}>
                            <label>Result</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-0 ">
                    {racingTeams.map((team, index) => <RacingTableRow team={team} key={index} />)}
                </div>
            </div>
        </div>
    </div>
}

export default RacingTable;
