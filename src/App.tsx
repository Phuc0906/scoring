import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import GroupStagePage from "./pages/GroupStagePage";
import LiveMatchesPage from "./pages/LiveMatchesPage";
import axios from "axios";

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
    const [isCheckIn, setIsCheckIn] = useState(false);
    const [requireCheckIn, setRequireCheckIn] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [alertCustomerName, setAlertCustomerName] = useState(false);
    const [alertCustomerEmail, setAlertCustomerEmail] = useState(false);

    const updateWindowSize = () => {
        console.log("Width: " + window.innerWidth)
        console.log("Height: " + window.innerHeight);
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useEffect(() => {
        if (localStorage.megaton_competition_scoring_system_register === undefined) {
            setRequireCheckIn(true);
        }
    }, [])

    useEffect(() => {
        // Update window size whenever the window is resized
        window.addEventListener('resize', updateWindowSize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);


    return (
        <div className=""  style={{ overflow: 'hidden' }}>
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
            <div className={`fixed z-40 bg-[#222222] bg-opacity-90 flex pt-[200px] items-center flex-col w-screen h-screen transition-all duration-500 ${requireCheckIn ? 'top-0' : '-top-[1500px]'}`}>
                <div className="h-fit py-5 w-4/5 bg-[#111111] rounded-3xl">
                    <div className="w-full text-center text-4xl font-bold text-red-700">
                        <label>Chào mừng bạn đến cuộc thi Drone Racing</label>
                    </div>
                    <div className="w-full text-center text-gray-300 mt-2">
                        <label>Chủ đề đường đua ánh sáng</label>
                    </div>
                    <div className={`text-white w-2/3 md:w-1/2 bg-[#303030] mt-4 ml-8 rounded-xl text-2xl ${alertCustomerName ? 'border-2 border-red-700' : ''}`}>
                        <input onChange={(e) => {
                            setCustomerName(e.target.value);
                        }} className="w-full h-full bg-transparent py-2 px-6 " type={"text"} placeholder={"Họ tên"}/>
                    </div>
                    <div className={`text-white w-2/3 md:w-1/2 bg-[#303030] mt-4 ml-8 rounded-xl text-2xl ${alertCustomerEmail ? 'border-2 border-red-700' : ''}`}>
                        <input onChange={(e) => {
                            setCustomerEmail(e.target.value);
                        }} className="w-full h-full bg-transparent py-2 px-6 " value={customerEmail} type={"email"} placeholder={"Email"}/>
                    </div>
                    {isCheckIn ? <div className="w-full">
                        <div className="w-1/2 bg-[#303030] mt-4 ml-8 rounded-xl text-2xl">
                            <input className="w-full h-full bg-transparent py-2 px-6 " type={"number"} placeholder={"Code"}/>
                        </div>
                        <div className="ml-8 text-gray-400 text-sm">
                            <label>Mã số xác thực được gửi về email của bạn</label>
                        </div>
                    </div> : null}
                    <div className="mt-4 h-fit w-2/3 md:w-1/6 bg-red-700 mx-auto rounded-xl">
                        <button onClick={() => {
                            if ((customerName.length !== 0) && (customerEmail.length !== 0)) {
                                axios.post(`${process.env.REACT_APP_API_URL}api/scoring/customer?name=${customerName}&email=${customerEmail}`).then(res => {
                                    console.log(res);
                                    setIsCheckIn(true);
                                    localStorage.megaton_competition_scoring_system_register = 1;
                                    window.location.reload();
                                }).catch(err => {
                                    console.log(err);
                                })
                            }else if ((customerName.length === 0) && (customerEmail.length === 0)) {
                                setAlertCustomerEmail(true);
                                setAlertCustomerName(true);
                            }else if (customerName.length === 0) {
                                setAlertCustomerName(true);
                            }else {
                                setAlertCustomerEmail(true);
                            }

                            // Later for SES Service
                            if (!isCheckIn) {

                                // Register API

                            }else {
                            //      Process verification API
                            }


                        }} className="w-full h-full py-2 px-7">{isCheckIn ? 'Xác thực' : 'Check in'}</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
