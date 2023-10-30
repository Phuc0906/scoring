import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import GroupStagePage from "./pages/GroupStagePage";
import LiveMatchesPage from "./pages/LiveMatchesPage";

interface WindowSizeProps {
    width: number,
    height: number,
}

export interface AppContextProps {
    windowSize: WindowSizeProps
}

export const AppContext = React.createContext<AppContextProps | null>(null);

function App() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const updateWindowSize = () => {
        console.log("Width: " + window.innerWidth)
        console.log("Height: " + window.innerHeight);
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useEffect(() => {
        // Update window size whenever the window is resized
        window.addEventListener('resize', updateWindowSize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);


    return (
        <AppContext.Provider value={{windowSize}}>
            <div className="">
                <NavBar/>
                <Routes>
                    <Route path={"/"} element={<HomePage/>} />
                    <Route path={"/group-stage"} element={<GroupStagePage/>} />
                    <Route path={"/live-matches"} element={<LiveMatchesPage/>} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
