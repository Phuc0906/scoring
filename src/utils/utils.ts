import team1 from "../assests/logo royal.png";
import team2 from "../assests/logo skis.png";
import team3 from "../assests/logo HUTECH.png";
import team4 from "../assests/logo CIS.png";
import team5 from "../assests/VAS.png"
import {APITeamProps} from "../pages/GroupStagePage";
import {API, graphqlOperation} from "aws-amplify";
import {createMatch, getAllMatches, getIsMatchSetting} from "../graphql/query/MatchQuery";
import {GraphQLResult} from "@aws-amplify/api";
import {MatchProps} from "../pages/LiveMatchesPage";

export const brandArr = [
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
    },
    {
        name: 'VAS',
        logo: team5
    }
]

export const processMaxId = async (teamsTemp: APITeamProps[], matchCategory: string) => {


    const response = await API.graphql(graphqlOperation(getAllMatches)) as GraphQLResult<any>;
    const matchTemp = response.data?.listMegatonMatches.items;
    matchTemp.sort((a: MatchProps, b: MatchProps) => parseInt(a.match_id, 10) - parseInt(b.match_id, 10));
    console.log("Process")
    const maxMatchId = parseInt(matchTemp[matchTemp.length - 1].match_id) + 1;
    const responseAvailableMatch = await API.graphql(graphqlOperation(getIsMatchSetting(matchCategory))) as GraphQLResult<any>;
    const availableMatches = responseAvailableMatch.data?.listMegatonMatches.items;
    if (availableMatches.length !== 0) {

    }else {
        await processKnockOut(teamsTemp, matchCategory, maxMatchId);
    }
}

const processKnockOut = async (teams: APITeamProps[], matchCategory: string, matchId: number) => {
    let ableToProcess = 3;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].win !== 2) {
            console.log("Teams")
            ableToProcess = 2;
            break;
        }else {
            ableToProcess = 1;
        }
    }

    if (ableToProcess === 1) {
        console.log("Process knockout match")
        let match_id = matchId;
        let orderId = 1;
        let i = 0;
        while (match_id < matchId + 4) {
            const response = await API.graphql(graphqlOperation(createMatch(`${matchCategory}_quarter_${orderId}`, teams[i].brand, teams[i + 1].brand, 1, `${match_id}`, 1, 1, 1, teams[i].team, teams[i + 1].team))) as GraphQLResult<any>;
            i += 2;
            orderId += 1;
            match_id++;
        }
    }else {
        console.log("Unable to process")
    }
}

export const getTableTitle = (board?: string) => {
    if (board?.includes("DRONE_UNI")) {
        return "DRONE ĐẠI HỌC"
    }else if (board?.includes("DRONE_REGULAR")) {
        return "DRONE PHỔ THÔNG"
    }
    return ""
}

export function groupByGroup(inputArray: APITeamProps[]) {
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
