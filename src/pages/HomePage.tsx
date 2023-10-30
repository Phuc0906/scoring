import React, {useContext, useEffect, useState} from "react";
import team1 from '../assests/logo royal.png';
import team2 from '../assests/logo skis.png';
import team3 from '../assests/logo HUTECH.png';
import team4 from '../assests/logo CIS.png';
import {AppContext, AppContextProps} from "../App";
import {APITeamProps, GroupPageRowProps} from "./GroupStagePage";
import {API, graphqlOperation} from "aws-amplify";
import {queryTeams} from "../graphql/query/TeamCRUD";
import {getAllMatches} from "../graphql/query/MatchQuery";
import {queryMatchByBoard, createMatch} from "../graphql/query/MatchQuery";
import {GraphQLResult} from "@aws-amplify/api";
import {teamChangeDetection} from "../graphql/subcriptions/TeamSubcription";
import {MatchProps} from "./LiveMatchesPage";

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
]

const GroupStageRowBuilder: React.FC<GroupPageRowProps> = ({team, idx}) => {
    const {windowSize} = useContext(AppContext) as AppContextProps;

    return <div className={`flex py-6 px-2 justify-between items-center mr-10`}>
        <div className={`flex items-center gap-4 w-fit text-center ${windowSize.width > 700 ? 'text-2xl' : 'text-lg'}`}>
            <div className={`${windowSize.width > 700 ? 'w-16' : 'w-8'}`}>
                <img src={brandArr[team.brand - 1].logo} />
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

const HomePage = () => {
    const [liveColor, setLiveColor] = useState('bg-green-50');
    const [toggleColor, setToggleColor] = useState(false);
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [groups, setGroups] = useState<APITeamProps[][]>([]);
    const [maxIdx, setMaxIdx] = useState(0);

    function groupByGroup(inputArray: APITeamProps[]) {
        const groupedArray = inputArray.reduce((acc, obj) => {
            const group = obj.board;
            // @ts-ignore
            const existingGroup = acc.find(item => item[0].board === group);
            if (existingGroup) {
                // @ts-ignore
                existingGroup.push(obj);
            } else {
                // @ts-ignore
                acc.push([obj]);
            }
            return acc;
        }, []);
        return groupedArray;
    }

    useEffect(() => {
        console.log("MAx: "+ maxIdx)
    }, [maxIdx])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await API.graphql(graphqlOperation(queryTeams)) as GraphQLResult<any>;
                const teamsTemp = response.data?.listMetaScoringCompetitions.items;
                teamsTemp.sort((a: APITeamProps, b: APITeamProps) => parseInt(a.team_id, 10) - parseInt(b.team_id, 10));
                setGroups(groupByGroup(teamsTemp));
                await processKnockOut();
            }catch (err) {
                console.error(err)
            }
        }

        const processKnockOut = async () => {
            const response = await API.graphql(graphqlOperation(getAllMatches)) as GraphQLResult<any>;
            const matchTemp = response.data?.listMegatonMatches.items
            matchTemp.sort((a: MatchProps, b: MatchProps) => parseInt(a.match_id, 10) - parseInt(b.match_id, 10));
            console.log("Process")
            setMaxIdx(parseInt(matchTemp[matchTemp.length - 1].match_id) + 1);
        }

        (API.graphql(graphqlOperation(teamChangeDetection)) as any).subscribe((eventData: any) =>
        {
            fetch().then(r => console.log(r));

        });

        fetch().then(r => console.log(r));
    }, [])

    const teamTestData: GroupStageProps[] = [
        {
            name: "Hutech 1",
            logo: team3,
            win: 2,
            draw: 0,
            lose: 1
        },
        {
            name: "SKIS 3",
            logo: team2,
            win: 2,
            draw: 0,
            lose: 1
        },
        {
            name: "CIS 2",
            logo: team4,
            win: 1,
            draw: 0,
            lose: 2
        },
        {
            name: "ROYAL 1",
            logo: team1,
            win: 1,
            draw: 0,
            lose: 2
        }
    ]

    useEffect(() => {

    }, [liveColor]);

    return <div className="mt-5">
        <div className={`text-white mt-10   ${windowSize.width > 700 ? 'mx-10 py-5 px-7 bg-[#222222]' : 'text-center mx-4'} rounded-3xl`}>
            <div className="font-bold text-4xl">
                <label>Các bảng đấu</label>
            </div>
            <div className={"mt-7 w-full flex flex-col gap-7"}>
                {groups.map((group, index) => {
                    const tempGroup = group;
                    tempGroup.sort((a, b) => (((((b.win - 1)*3) + (b.draw - 1)) - (((a.win - 1)*3) + (a.draw - 1))) !== 0 ? ((((b.win - 1)*3) + (b.draw - 1)) - (((a.win - 1)*3) + (a.draw - 1))) : ((a.win - b.win) !== 0) ? (a.win - b.win) : (b.lose - a.lose)) )

                    // Process for knock out match
                    let isAvailableToKnockOut = true;
                    for (let i = 0; i < tempGroup.length; i++) {
                        if ((tempGroup[i].win - 1 + tempGroup[i].lose - 1 + tempGroup[i].draw - 1) === tempGroup.length - 1) {

                        }else {
                            isAvailableToKnockOut = false;
                        }
                    }
                    const processMatch = async () => {
                        const response = await API.graphql(graphqlOperation(queryMatchByBoard("quarter_1"))) as GraphQLResult<any>;

                    }

                    if (isAvailableToKnockOut) {
                        console.log("Able for knock out");
                        if (group[0].board === 'A') {

                            console.log("Move " + group[0].team + " to " + "quarter 1")
                            console.log("Move " + group[1].team + " to " + "quarter 3")
                        }else if (group[0].board === 'B') {
                            console.log("Move " + group[0].team + " to " + "quarter 3")
                            console.log("Move " + group[1].team + " to " + "quarter 1")
                        }else if (group[0].board === 'C') {
                            console.log("Move " + group[0].team + " to " + "quarter 2")
                            console.log("Move " + group[1].team + " to " + "quarter 4")
                        }else {
                            console.log("Move " + group[0].team + " to " + "quarter 4")
                            console.log("Move " + group[1].team + " to " + "quarter 2")
                        }
                    }
                    console.log("Reload")

                    return <div className="  text-2xl font-bold rounded-3xl">
                        <div className="bg-black text-center flex items-center justify-center pt-5 pb-5 rounded-t-3xl">
                            <label>Bảng {group[0].board}</label>
                        </div>
                        <div className="bg-[#303030] w-full py-2 px-3 rounded-b-xl pt-2 border-[#171717] border-2">
                            <div className="flex justify-between items-center border-b-2 border-b-gray-400 pb-6">
                                <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-40' : 'text-lg w-20'}`}>
                                    <label>Đội</label>
                                </div>
                                <div className={`flex ${windowSize.width > 700 ? 'gap-16' : 'gap-4'} mr-10`}>
                                    <div className={` text-center  ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                                        <label>Thắng</label>
                                    </div>
                                    <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                                        <label>Hoà</label>
                                    </div>
                                    <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                                        <label>Thua</label>
                                    </div>
                                    <div className={` text-center ${windowSize.width > 700 ? 'text-2xl w-16' : 'text-lg w-12'}`}>
                                        <label>Điểm</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-0 ">
                                {tempGroup.map((team, index) =><GroupStageRowBuilder idx={index} team={team} key={index}/>)}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default HomePage;
