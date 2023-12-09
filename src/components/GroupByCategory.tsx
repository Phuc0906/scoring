import React, {useContext, useEffect, useState} from "react";
import {APITeamProps} from "../pages/GroupStagePage";
import team1 from "../assests/logo royal.png";
import team2 from "../assests/logo skis.png";
import team3 from "../assests/logo HUTECH.png";
import team4 from "../assests/logo CIS.png";
import team5 from '../assests/VAS.png';
import team6 from '../assests/kr_flag.png'
import {AppContext, AppContextProps} from "../App";
import {API, graphqlOperation} from "aws-amplify";
import {queryTeamByCategory, queryTeams} from "../graphql/query/TeamCRUD";
import {GraphQLResult} from "@aws-amplify/api";
import {groupByGroup} from "../utils/utils";
import {teamChangeDetection} from "../graphql/subcriptions/TeamSubcription";

const MAX_SCREEN_SIZE = 1000;

const brandArr = [
    {
        name: 'Royal',
        logo: team1
    },
    {
        name: 'SIKS',
        logo: team2
    },
    {
        name: 'Hutech',
        logo: team3
    },
    {
        name: 'CIS',
        logo: team4
    }
    ,
    {
        name: 'VAS',
        logo: team5
    }
    ,
    {
        name: 'KOREA',
        logo: team6
    }
]

export interface GroupStageRowBuilderProps {
    team: APITeamProps,
    idx: number
}

export interface MatchProps {
    match_id: string,
    team1: string,
    team2: string,
    brand1: number,
    brand2: number,
    score1: number,
    score2: number,
    live: number

}

type CategoryGroupProps = {
    category: string
}



const GroupStageRowBuilder: React.FC<GroupStageRowBuilderProps> = ({team, idx}) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;

    return <div className={`flex py-6 px-2 justify-between items-center `}>
        <div className={`flex items-center gap-0 w-fit text-left ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl' : 'text-sm'}`}>
            <div className={`${windowSize.width > MAX_SCREEN_SIZE ? 'w-16' : 'w-10'}`}>
                <img src={brandArr[team.brand - 1].logo} />
            </div>
            <div className="w-28">
                <label>{team.team}</label>
            </div>
        </div>
        <div className={`flex  ${windowSize.width > MAX_SCREEN_SIZE ? 'gap-16 ' : 'gap-1'}`}>
            <div className={` text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{team.win - 1}</label>
            </div>
            <div className={` text-center   ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{team.draw - 1}</label>
            </div >
            <div className={` text-center   ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{team.lose - 1}</label>
            </div>
            <div className={` text-center   ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{(team.score === 1) ? '0' : team.score.toFixed(2)} s</label>
            </div>
            <div className={` text-center   ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                <label>{(team.win - 1)*3 + (team.draw - 1)}</label>
            </div>
        </div>
    </div>
}
const GroupByCategory = ({category}: CategoryGroupProps) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [isView, setIsView] = useState(false);
    const [sortedGroup, setSortedGroup] = useState<APITeamProps[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await API.graphql(graphqlOperation(queryTeamByCategory(category))) as GraphQLResult<any>;
                const teamsTemp: APITeamProps[] = response.data?.listMegatonCompetitionTeamTables.items;
                teamsTemp.sort((a: APITeamProps, b: APITeamProps) => parseInt(a.team_id, 10) - parseInt(b.team_id, 10));
                sortTeam(teamsTemp);
            }catch (err) {
                console.error(err)
            }
        }

        (API.graphql(graphqlOperation(teamChangeDetection)) as any).subscribe((eventData: any) =>
        {
            setSortedGroup([]);
            fetch().then(r => console.log(r));
        });

        fetch().then(r => {

        });
    }, []);

    const sortTeam = (group: APITeamProps[]) => {
        let processGroup: APITeamProps[] = group;


        for (let i = 0; i < processGroup.length; i++) {
            const rootTeamScore = (processGroup[i].win - 1) * 3 + (processGroup[i].draw - 1);
            for (let k = 0; k < processGroup.length; k++) {
                const comparedTeam = (processGroup[k].win - 1) * 3 + (processGroup[k].draw - 1);
                if (rootTeamScore > comparedTeam) {
                    const tmp = processGroup[i];
                    processGroup[i] = processGroup[k];
                    processGroup[k] = tmp;

                }else if (rootTeamScore === comparedTeam) {
                    if (processGroup[k].score > processGroup[i].score) {
                        const tmp = processGroup[i];
                        processGroup[i] = processGroup[k];
                        processGroup[k] = tmp;
                    }
                }
            }
        }

        for (let i = 0; i < processGroup.length; i++) {
            const rootTeamScore = (processGroup[i].win - 1) * 3 + (processGroup[i].draw - 1);
            for (let k = 0; k < processGroup.length; k++) {
                const comparedTeam = (processGroup[k].win - 1) * 3 + (processGroup[k].draw - 1);
                if (rootTeamScore > comparedTeam) {
                    const tmp = processGroup[i];
                    processGroup[i] = processGroup[k];
                    processGroup[k] = tmp;

                }else if (rootTeamScore === comparedTeam) {
                    if (processGroup[k].score > processGroup[i].score) {
                        const tmp = processGroup[i];
                        processGroup[i] = processGroup[k];
                        processGroup[k] = tmp;
                    }
                }
            }
        }
        setSortedGroup(processGroup);
        console.log()
    }

    useEffect(() => {


    }, [])

    return <div className="  text-2xl font-bold rounded-3xl">
        <div className="bg-black text-center flex items-center justify-between px-16 pt-5 pb-5 rounded-t-3xl">
            <div className="invisible">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <div>
                <label>GROUP {(category.split("_")[category.split("_").length - 1])}</label>
            </div>
            <div onClick={() => {
                setIsView(!isView);
            }}>
                {isView ? <div>
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
        <div className="bg-[#303030]  w-full py-2 px-3 rounded-b-xl pt-2 border-[#171717] border-2">
            <div className={`flex ${isView ? '' : 'hidden'} justify-between items-center border-b-2 border-b-gray-400 pb-6`}>
                <div className={` text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl' : 'text-sm'} w-40`}>
                    <label>Team</label>
                </div>
                <div className={`flex  ${windowSize.width > MAX_SCREEN_SIZE ? 'gap-16 ' : 'gap-1'}`}>
                    <div className={`text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-sm w-12'}`}>
                        <label>Win</label>
                    </div>
                    <div className={` text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-sm w-12'}`}>
                        <label>Draw</label>
                    </div>
                    <div className={`text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-sm w-12'}`}>
                        <label>Lose</label>
                    </div>
                    <div className={`text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-sm w-12'}`}>
                        <label>Time</label>
                    </div>
                    <div className={`text-center ${windowSize.width > MAX_SCREEN_SIZE ? 'text-2xl w-16' : 'text-sm w-12'}`}>
                        <label>Points</label>
                    </div>
                </div>
            </div>
            <div className={`flex ${isView ? '' : 'hidden'} h-fit flex-col gap-0 `}>
                {sortedGroup.map((team, index) =><GroupStageRowBuilder idx={index} team={team} key={index}/>)}
            </div>
        </div>
    </div>
}

export default GroupByCategory;
