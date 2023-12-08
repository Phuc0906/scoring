import React, {useEffect, useState} from "react";
import {MatchProps} from "../pages/LiveMatchesPage";
import {API, graphqlOperation} from "aws-amplify";
import {queryMatchByBoard} from "../graphql/query/MatchQuery";
import {GraphQLResult} from "@aws-amplify/api";
import {onCreateMatch, onUpdateMatch} from "../graphql/subcriptions/Match";
import TBD_LOGO from "../assests/TBD_LOGO.png";
import {brandArr} from "../utils/utils";

type KnockoutPosProps = {
    pos: string,
    title: string,
    detectMatch: string
}

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
                <div className={`${match.score1 > match.score2 ? 'text-red-600 font-bold' : ''}`}>
                    <label>{match.team1.length === 0 ? 'TBD' : match.team1}</label>
                </div>
            </div>
            <div className="flex gap-4 items-center text-lg">
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
                <div className={`${match.score2 > match.score1 ? 'text-red-600 font-bold' : ''}`}>
                    <label>{match.team2.length === 0 ? 'TBD' : match.team2}</label>

                </div>
            </div>
        </div>
    </div>
}

export default KnockOutMatch;
