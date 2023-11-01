import React, {useContext, useEffect, useRef, useState} from "react";
import team3 from "../assests/logo HUTECH.png";
import team2 from "../assests/logo skis.png";
import team4 from "../assests/logo CIS.png";
import team1 from "../assests/logo royal.png";
import finalLogo from '../assests/Logo2.png'
import {GroupStageProps, GroupStageRowBuilderProps} from "./HomePage";
import {AppContext, AppContextProps} from "../App";
import {useLocation} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import {queryTeams} from "../graphql/query/TeamCRUD";
import {teamChangeDetection} from "../graphql/subcriptions/TeamSubcription";
import {onUpdateMatch, onCreateMatch} from "../graphql/subcriptions/Match";
import {getAllMatches, queryMatchByBoard} from "../graphql/query/MatchQuery";
import {MatchProps} from "./LiveMatchesPage";
import TBD_LOGO from '../assests/TBD_LOGO.png'

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

interface KnockoutPosProps {
    pos: string,
    title: string,
    detectMatch: string
}

const GroupStagePage = () => {
    const {windowSize} = useContext(AppContext) as AppContextProps;

    const KnockOutMatch: React.FC<KnockoutPosProps> = ({pos, title, detectMatch}) => {
        const [match, setMatch] = useState<MatchProps>({
            match_id: "",
            team1: "",
            brand1: 1,
            score1: 1,
            team2: "",
            brand2: 1,
            score2: 1,
            live: 1,
            board: "",
            table: 1
        });


        useEffect(() => {
            const fetch_match = async () => {
                const response = await API.graphql(graphqlOperation(queryMatchByBoard(detectMatch))) as GraphQLResult<any>;
                const matchTemp = response.data?.listMegatonMatches.items
                if (matchTemp.length !== 0) {
                    setMatch(matchTemp[0]);
                }
            }


            (API.graphql(graphqlOperation(onUpdateMatch)) as any).subscribe((eventData: any) =>
            {
                fetch_match().then(r => console.log(r));


            });

            (API.graphql(graphqlOperation(onCreateMatch)) as any).subscribe((eventData: any) =>
            {
                fetch_match().then(r => console.log(r));
            });
            fetch_match().then(r => console.log(r));

        }, [])


        return <div className={`absolute w-fit border-2 border-red-300 ${pos} text-sm  px-2.5 py-1  bg-white text-black rounded-xl`}>
            <div>
                <label>{title}</label>
            </div>
            <div className="flex flex-row gap-3 items-center justify-between">
                <div className="flex flex-col items-center">
                    <div>
                        <div className="w-10">
                            <img src={(match.team1.length === 0) ? TBD_LOGO : brandArr[match.brand1 - 1].logo} />
                        </div>
                    </div>
                    <div className={`${match.score1 > match.score2 ? 'text-red-700' : ''}`}>
                        <label>{match.team1.length === 0 ? 'TBD' : match.team1}</label>
                    </div>
                </div>
                <div className="flex gap-4 items-center invisible">
                    <div>
                        <label>{match.score1 - 1}</label>
                    </div>
                    <div>
                        <label>-</label>
                    </div>
                    <div>
                        <label>{match.score2 - 1}</label>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div>
                        <div className="w-10">
                            <img src={(match.team2.length === 0) ? TBD_LOGO : brandArr[match.brand2 - 1].logo} />
                        </div>
                    </div>
                    <div className={`${match.score2 > match.score1 ? 'text-red-900' : ''}`}>
                        <label>{match.team2.length === 0 ? 'TBD' : match.team2}</label>
                    </div>
                </div>
            </div>
        </div>
    }


    return <div>
        <div className={`w-full ${windowSize.width < 1400 ? '' : 'flex justify-center'} h-fit  text-white text-xl flex overflow-scroll`} style={{ overflowY: 'hidden' }}>
            {/*Quarter left*/}
            <div className=" flex w-fit text-center flex-col gap-7 mt-10">
                <div>
                    <label>Vòng tứ kết</label>
                </div>
                <div className="mt-10 relative flex flex-row items-center justify-center w-[250px] h-[440px] border-t-2 border-r-2 border-b-2 border-orange-400 pr-5">
                    <KnockOutMatch pos={`-top-10`} title={``} detectMatch={`quarter_1`}/>
                    <div className="w-28">
                        <img src={finalLogo} />
                    </div>
                    <KnockOutMatch pos={`-bottom-10`} title={``} detectMatch={`quarter_2`}/>
                </div>

            </div>
            {/*Semi left*/}
            <div className=" flex w-fit text-center flex-col gap-7 mt-10">
                <div>
                    <label>Bán kết</label>
                </div>
                <div className="w-[270px] h-[490px] flex flex-col justify-center ">
                    <div className="relative flex flex-row items-center justify-center h-[2px] my-auto bg-orange-500">
                        <KnockOutMatch pos={`-top-8`} title={``} detectMatch={`semi_1`}/>
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
                        <KnockOutMatch pos={`-top-12`} title={`Chung kết`} detectMatch={`final`}/>
                        <div className="w-28">
                            <img src={finalLogo} />
                        </div>
                        <KnockOutMatch pos={`-bottom-12`} title={`Tranh hạng ba`} detectMatch={`third`}/>
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
                    <div className="relative flex flex-row items-center justify-center h-[2px] my-auto bg-orange-500">
                        <KnockOutMatch pos={`-top-8`} title={``} detectMatch={`semi_2`}/>
                    </div>
                </div>
            </div>
            {/*Quarter left*/}
            <div className=" flex w-fit text-center flex-col gap-7 mt-10">
                <div>
                    <label>Vòng tứ kết</label>
                </div>
                <div className="mt-10 relative flex flex-row items-center justify-center w-[250px] h-[440px] border-t-2 border-l-2 border-b-2 border-orange-400 pl-5">
                    <KnockOutMatch pos={`-top-10`} title={``} detectMatch={`quarter_3`}/>
                    <div className="w-28">
                        <img src={finalLogo} />
                    </div>
                    <KnockOutMatch pos={`-bottom-10`} title={``} detectMatch={`quarter_4`}/>
                </div>
            </div>

        </div>
    </div>
}

export default GroupStagePage;
