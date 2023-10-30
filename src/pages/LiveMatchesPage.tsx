import React, {useContext, useEffect, useState} from "react";
import team1 from '../assests/logo royal.png';
import team2 from '../assests/logo skis.png';
import team3 from '../assests/logo HUTECH.png';
import team4 from '../assests/logo CIS.png';
import {AppContext, AppContextProps} from "../App";
import {queryMatchByTable} from "../graphql/query/MatchQuery";
import {onUpdateMatch} from "../graphql/subcriptions/Match";
import {API, graphqlOperation} from "aws-amplify";
import {Observable} from "zen-observable-ts";
import {GraphQLResult} from "@aws-amplify/api";

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

export interface MatchProps {
    match_id: string,
    team1: string,
    brand1: number,
    score1: number,
    team2: string,
    brand2: number,
    score2: number,
    live: number,
    board: string,
    table: number
}

interface LiveBoardProps {
    idx: number
}

const LiveBoard: React.FC<LiveBoardProps> = ({idx}) => {
    const [onFullScreen, setOnFullScreen] = useState(false);
    const [liveColor, setLiveColor] = useState('bg-green-50');
    const [toggleColor, setToggleColor] = useState(false);
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [isShowBoard, setIsShowBoard] = useState(false);
    const [isMatchLive, setIsMatchLive] = useState(false);
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
    })



    const fetchMatchByTable = async () => {
        console.log("Fetching table data");
        const response = await API.graphql(graphqlOperation(queryMatchByTable(idx))) as GraphQLResult<any>;
        const matchTemp = response.data?.listMegatonMatches.items
        setIsShowBoard(false);
        setIsMatchLive(false);
        for (let i = 0; i < matchTemp.length; i++) {
            if (matchTemp[i].table === idx + 1) {
                setIsShowBoard(true);
                if (matchTemp[i].live === 2) {
                    setIsMatchLive(true);
                }
                try {
                    setMatch({
                        match_id: matchTemp[i].match_id,
                        team1: matchTemp[i].team1,
                        brand1: matchTemp[i].brand1,
                        score1: matchTemp[i].score1,
                        team2: matchTemp[i].team2,
                        brand2: matchTemp[i].brand2,
                        score2: matchTemp[i].score2,
                        board: matchTemp[i].board,
                        live: matchTemp[i].live,
                        table: matchTemp[i].table
                    })
                    break;
                }catch (err) {

                }
            }
        }
    }

    useEffect(() => {
        fetchMatchByTable();
    }, [])

    useEffect( () => {
        (API.graphql(graphqlOperation(onUpdateMatch)) as any).subscribe((eventData: any) =>
        {
            fetchMatchByTable();
            // const result = eventData.value.data.onUpdateGameMatch;
            // console.log(result);

        });
    }, [])

    useEffect(() => {

    }, [liveColor]);

    useEffect(() => {
        const interval = setInterval(() => {
            setToggleColor(!toggleColor);
            if (toggleColor) {
                setLiveColor('bg-green-200')
            }else {
                setLiveColor('bg-green-500');
            }
        }, 1000);

        // Clear the interval when the component unmounts or if you have any cleanup logic
        return () => clearInterval(interval);
    }, [liveColor]);


    return <div>
        {isShowBoard ? <div className={`${onFullScreen ? '' : 'mt-10'} ${isShowBoard ? '' : 'hidden'} relative`}>
            <div className={`relative ${windowSize.width > 700 ? (onFullScreen ? 'w-screen h-screen pt-10' : 'w-3/5') : 'w-full'}  mx-auto bg-[#222222] pb-10 rounded-2xl`}>
                {windowSize.width > 700 ? <div onClick={() => {
                    setOnFullScreen(!onFullScreen);
                }} className="absolute right-6 top-6">
                    {onFullScreen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className={`${onFullScreen ? 'w-14 h-14' : 'w-6 h-6'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className={`${onFullScreen ? 'w-14 h-14' : 'w-6 h-6'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>}

                </div> : null}
                <div className={`w-full text-center ${onFullScreen ? 'text-6xl' : 'text-2xl'} text-white py-6`}>
                    <label>Trận đấu của bảng B bộ môn drone bóng đá </label>
                    <div className={`${toggleColor ? 'text-green-500' : 'text-green-200'} ${isMatchLive ? '' : 'hidden'} transition-colors duration-1000 ${onFullScreen ? 'text-2xl mt-5' : 'text-lg'} mb-1`}>
                        <label>Đang diễn ra</label>
                    </div>
                    <div className={`w-1/12 h-1 ${liveColor} ${isMatchLive ? '' : 'hidden'} transition-colors duration-1000 mx-auto rounded-xl`}/>
                </div>

                <div className="flex w-full items-center justify-between">
                    <div className={`${onFullScreen ? 'w-96' : 'w-36'}`}>
                        <div className="w-full">
                            <img src={brandArr[match.brand1 - 1].logo} alt={"Team 1"}/>
                        </div>
                        <div className={`w-full text-center text-white ${onFullScreen ? 'text-5xl' : 'text-xl'}`}>
                            <label>{match.team1}</label>
                        </div>
                    </div>

                    <div className={`text-white ${onFullScreen ? 'text-8xl' : 'text-4xl'} flex items-center justify-between gap-9`}>
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

                    <div className={`${onFullScreen ? 'w-96' : 'w-36'}`}>
                        <div className="w-full">
                            <img src={brandArr[match.brand2 - 1].logo} alt={"Team2"} />
                        </div>
                        <div className={`w-full text-center text-white ${onFullScreen ? 'text-5xl' : 'text-xl'}`}>
                            <label>{match.team2}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <div className="w-3/5  bg-[#222222] text-white mx-auto h-44 flex items-center justify-between">
            <label className="h-fit my-auto w-full text-4xl text-center">Sa bàn {idx} đang đợi</label>
        </div>}
    </div>
}

const LiveMatchesPage = () => {
    const tables = [1,2,3,4];

    return <div className="flex flex-col gap-8 mt-10 mb-10">
        {tables.map((table, idx) => <LiveBoard idx={table} key={table}/>)}
    </div>
}

export default LiveMatchesPage;
