import React, {useContext, useEffect, useState} from "react";
import {APITeamProps} from "../pages/GroupStagePage";
import {API, graphqlOperation} from "aws-amplify";
import {queryTeams} from "../graphql/query/TeamCRUD";
import {GraphQLResult} from "@aws-amplify/api";
import {groupByGroup} from "../utils/utils";
import {teamChangeDetection} from "../graphql/subcriptions/TeamSubcription";
import GroupByCategory from "./GroupByCategory";
import {AppContext, AppContextProps} from "../App";

const SumoBoard = () => {
    const [groups, setGroups] = useState<APITeamProps[][]>([]);
    const {windowSize} = useContext(AppContext) as AppContextProps;

    useEffect(() => {

    }, [])


    return <div className={`text-white mt-10   ${windowSize.width > 700 ? 'mx-10 py-5 px-7 bg-[#222222]' : 'text-center'} rounded-3xl`}>
        <div className="font-bold text-4xl">
            <label>SUMO</label>
        </div>
        <div className="flex flex-col gap-10 text-white mt-10 w-full mx-auto">
            <GroupByCategory category={"SUMO_UNI_A"}/>
            <GroupByCategory category={"SUMO_UNI_B"}/>
            <GroupByCategory category={"SUMO_UNI_C"}/>
            <GroupByCategory category={"SUMO_UNI_D"}/>
        </div>
    </div>
}

export default SumoBoard;
