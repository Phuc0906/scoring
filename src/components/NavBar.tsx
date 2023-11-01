import React, {useContext, useState} from "react";
import logo2 from '../assests/1_White.png'
import {AppContext, AppContextProps} from "../App";
import {Link, useNavigate} from "react-router-dom";

const NavBar = () => {
    const {windowSize} = useContext(AppContext) as AppContextProps;
    const [burgerClick, setBurgerClick] = useState(false);
    const [onHoverGroup, setOnHoverGroup] = useState(false);
    const navigate = useNavigate();


    return <div className="w-full relative">
        <div onMouseLeave={() => {
            setOnHoverGroup(false);
        }} className="sticky top-0 z-40 flex justify-between items-center bg-[#222222] py-4 px-3">
            <div className="w-44" >
                <img src={logo2} alt={"Logo"} />
            </div>
            {windowSize.width > 700 ? <div className="mr-32 flex flex-row gap-4 items-center text-xl text-blue-400">
                <div onMouseEnter={() => {
                    setOnHoverGroup(false);
                }} >
                    <Link to={`/`} onClick={() => {
                        window.location.href = '/';
                    }}>TRANG CHỦ</Link>
                </div>
                <div onMouseEnter={() => {
                    setOnHoverGroup(true);
                }} className={`relative w-fit`}>
                    <Link to={`/group-stage`} >VÒNG LOẠI TRỰC TIẾP</Link>
                </div>
                {/*<div onMouseEnter={() => {*/}
                {/*    setOnHoverGroup(false);*/}
                {/*}}>*/}
                {/*    <Link to={"/live-matches"}>ĐANG DIỄN RA</Link>*/}
                {/*</div>*/}
            </div> : <div onClick={() => {
                setBurgerClick(!burgerClick);
            }} className={`${!burgerClick ? 'rotate-0' : 'rotate-90'} transition-all duration-500`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="#FFFFFF" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>}
        </div>
        <div className={`absolute w-full bg-[#222222] transition-all duration-500 ${burgerClick ? 'top-30' : '-top-[150px]'}`}>
            <div className="flex flex-col gap-0 ">
                <div className="w-full text-center text-2xl text-gray-100">
                    <button onClick={() => {
                        navigate('/');
                        window.location.reload();
                    }}  className="w-full h-full py-4 px-1 hover:bg-gray-500">Trang chủ</button>
                </div>
                <div className="w-full text-center text-2xl text-gray-100">
                    <button onClick={() => {
                        navigate('/group-stage');
                        window.location.reload();
                    }} className="w-full h-full py-4 px-1 hover:bg-gray-500">Vòng loại trực tiếp</button>
                </div>
                {/*<label>Trang chu</label>*/}
            </div>
        </div>
    </div>
}

export default NavBar;
